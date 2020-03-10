import { Trade, TradeLike } from "../domain/trade";
import { TradeRequestEvent } from "../domain/event";
import { User } from "../domain/user";
import { Gold, hasSubset } from "../domain/tokens";
import { getUser } from "../store/user";
import BigNumber from "bignumber.js";

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

    const trade: TradeLike = {
        id: event.id,
        validStartAt: event.timestamp,
        requestee,
        requestor,
        requesteeEmoji,
        requesteeGold,
        requestorEmoji,
        requestorGold,
        isAccepted: false
    }

    return trade as Trade;
}

export function validateTrade(trade: TradeLike): boolean {

    if (trade.requestee === null) {
        console.warn(`rejecting request ${JSON.stringify(event)}; unknown requestee`);
        return false;
    }

    if (trade.requestor === null) {
        console.warn(`rejecting request ${JSON.stringify(event)}; unknown requestor`);
        return false;
    }

    if (trade.requestorGold.isNegative() || trade.requesteeGold.isNegative()) {
        console.warn(`rejecting request ${JSON.stringify(event)}; a gold amount is negative`);
        return false;
    }

    // require a trade to at least do *something*
    const hasValue = trade.requestorEmoji.size > 0
        || trade.requesteeEmoji.size > 0
        || !trade.requestorGold.isZero()
        || !trade.requesteeGold.isZero();

    if (!hasValue) {
        console.warn(`rejecting request ${JSON.stringify(event)}; trade has no value`);
        // Not a valid TradeRequest
        return false;
    }

    // ensure both parties have sufficient gold/emoji balances
    if (!hasSubset(trade.requestee.balance.emoji, trade.requesteeEmoji)) {
        console.warn(`rejecting request ${JSON.stringify(event)}; requestee does not have requested emoji`);
        return false;
    }

    if (!hasSubset(trade.requestor.balance.emoji, trade.requestorEmoji)) {
        console.warn(`rejecting request ${JSON.stringify(event)}; requestor does not have requested emoji`);
        return false;
    }

    if (trade.requestee.balance.gold.isLessThan(trade.requesteeGold)) {
        console.warn(`rejecting request ${JSON.stringify(event)}; requestee does not have sufficient balance`);
        return false;
    }

    if (trade.requestor.balance.gold.isLessThan(trade.requestorGold)) {
        console.warn(`rejecting request ${JSON.stringify(event)}; requestor does not have sufficient balance`);
        return false;
    }

    return true;
}