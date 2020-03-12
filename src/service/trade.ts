import { Trade, TRADE_DURATION } from "../domain/trade";
import { TradeRequestEvent } from "../domain/event";
import { User } from "../domain/user";
import { Gold, hasSubset } from "../domain/tokens";
import { getUser } from "../store/user";
import BigNumber from "bignumber.js";
import state from "../store/state";

export function parseTrade(event: TradeRequestEvent): Trade | undefined {
    let requestee: User | null;
    let requestor: User | null;
    let requesteeGold: Gold;
    let requestorGold: Gold;
    let requesteeEmoji: Set<number>;
    let requestorEmoji: Set<number>;

    try {
        requestee = getUser(event.payload.requesteePublicKey);
        requestor = getUser(event.payload.requestorPublicKey);
        requestorGold = new BigNumber(event.payload.requestorGold);
        requesteeGold = new BigNumber(event.payload.requesteeGold);
        requesteeEmoji = new Set(event.payload.requesteeEmoji);
        requestorEmoji = new Set(event.payload.requestorEmoji);
    } catch (e) {
        console.warn(`request ${JSON.stringify(event)} invalid: ${e}`);
        return;
    }

    if (requestee == null || requestor == null) {
        console.warn(`request ${JSON.stringify(event)} invalid: one or more users does not exist`);
        return;
    }


    const trade: Trade = {
        id: event.id,
        validStartAt: event.timestamp,
        requestee,
        requestor,
        requesteeEmoji,
        requesteeGold,
        requestorEmoji,
        requestorGold,
        isAccepted: false,
        isValid: true
    }

    return trade as Trade;
}

// WARNING: Mutates trade.isValid
export function validateTrade(id: number): boolean {
    const trade = state.network.trades.get(id);
    if (trade == null) return false;

    // Has the trade timed out?
    const expiration = new Date(trade.validStartAt);
    expiration.setSeconds(trade.validStartAt.getSeconds() + TRADE_DURATION);
    if (new Date().getTime() > expiration.getTime()) {
        console.warn(`Invalid trade ${JSON.stringify(trade)}: timed out`);
        trade.isValid = false;
    }

    if (trade.requestorGold.isNaN() || trade.requesteeGold.isNaN()) {
        console.warn(`Invalid trade ${JSON.stringify(trade)}: NaN gold amount`);
    }
    
    if (trade.requestorGold.isNegative() || trade.requesteeGold.isNegative()) {
        console.warn(`Invalid trade ${JSON.stringify(trade)}: a gold amount is negative`);
        trade.isValid = false;
    }

    // require a trade to at least do *something*
    const hasValue = trade.requestorEmoji.size > 0
        || trade.requesteeEmoji.size > 0
        || !trade.requestorGold.isZero()
        || !trade.requesteeGold.isZero();

    if (!hasValue) {
        console.warn(`Invalid trade ${JSON.stringify(trade)}: trade has no value`);
        // Not a valid TradeRequest
        trade.isValid = false;
    }

    // ensure both parties have sufficient gold/emoji balances
    if (!hasSubset(trade.requestee.balance.emoji, trade.requesteeEmoji)) {
        console.warn(`Invalid trade ${JSON.stringify(trade)}: requestee does not have requested emoji`);
        trade.isValid = false;
    }

    if (!hasSubset(trade.requestor.balance.emoji, trade.requestorEmoji)) {
        console.warn(`Invalid trade ${JSON.stringify(trade)}: requestor does not have requested emoji`);
        trade.isValid = false;
    }

    if (trade.requestee.balance.gold.isLessThan(trade.requesteeGold)) {
        console.warn(`Invalid trade ${JSON.stringify(trade)}: requestee does not have sufficient balance`);
        trade.isValid = false;
    }

    if (trade.requestor.balance.gold.isLessThan(trade.requestorGold)) {
        console.warn(`Invalid trade ${JSON.stringify(trade)}: requestor does not have sufficient balance`);
        trade.isValid = false;
    }

    return trade.isValid;
}

export function removeInvalidOpenTrades(): void {
    // Validate trades and remove invalid from openTrades
    const invalidTradeIds = state.network.openTrades.filter((id) => !validateTrade(id))
    invalidTradeIds.map((id) => {
        const index = state.network.openTrades.indexOf(id);
        if (index >= 0) {
            state.network.openTrades.splice(index, 1);
        }
    });
}

export function onExpectedExpiration(id: number, callback: () => void): void {
    const trade = state.network.trades.get(id);
    if (trade == null) return;

    const timeToWait = (TRADE_DURATION * 1000) - (new Date().getTime() - trade.validStartAt.getTime())
    console.log(`will use callback on ${trade.id} in ${timeToWait} millis`);

    window.setTimeout(() => {
        callback();
    }, timeToWait);
}

export function validatePendingTrades(): void {
    Array.from(state.network.trades.values())
        .filter((trade)=> !trade.isAccepted && trade.isValid)
        .forEach((trade) => validateTrade(trade.id));
}
