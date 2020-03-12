import { TradeAcceptEvent, EventType, Message } from "../../domain/event";
import * as hedera from "../../service/hedera";
import { ConsensusTopicId, Ed25519PublicKey } from "@hashgraph/sdk";
import state from "../state";
import { Gold, hasSubset } from "../../domain/tokens";
import { validateSignature } from "../../service/crypto";
import { Trade, TRADE_DURATION } from "../../domain/trade";
import { removeInvalidOpenTrades, validatePendingTrades } from "../../service/trade";
import { getTrade } from "../trade";

let resolvePublish: (() => void) | null = null;

export async function publish(tradeId: number): Promise<void> {
    const promise = new Promise((resolve) => {
        resolvePublish = resolve
    });
    await hedera.submitMessage(new ConsensusTopicId(state.topicId!), {
        type: EventType.TradeAccept,
        payload: {
            tradeId,
        }
    });
    await promise;
}

export function handle(event: TradeAcceptEvent): void {
    const trade = getTrade(event.payload.tradeId)!;
    const requesteeKey = Ed25519PublicKey.fromString(trade.requestee.publicKey).toBytes();
    if (validateSignature(event, requesteeKey)) {
        _handle(trade, event.timestamp);
    }
}

export function _handle(trade: Trade, acceptedTimestamp: Date): void {
    const expiration = trade.validStartAt.getTime() + (TRADE_DURATION * 1000);
    const requestor = state.network.users.get(trade.requestor.publicKey)!;
    const requestee = state.network.users.get(trade.requestee.publicKey)!;

    if (acceptedTimestamp.getTime() > expiration) {
        console.log("accepted event was too late");
    } else if (!hasSubset(requestor.balance.emoji, trade.requestorEmoji)) {
        console.log("requestor does not have the emoji to be traded");
    } else if (!hasSubset(requestee.balance.emoji, trade.requesteeEmoji)) {
        console.log("requestee does not have the emoji to be traded");
    } else if (requestor.balance.gold.isLessThan(trade.requestorGold)) {
        console.log("requestor does not have sufficient gold for the trade");
    } else if (requestee.balance.gold.isLessThan(trade.requesteeGold)) {
        console.log("requestee does not have sufficient gold for the trade");
    } else {
        // Exchange Gold
        trade.requestor.balance.gold = trade.requestor.balance.gold
            .minus(trade.requestorGold)
            .plus(trade.requesteeGold) as Gold;

        trade.requestee.balance.gold = trade.requestee.balance.gold
            .minus(trade.requesteeGold)
            .plus(trade.requestorGold) as Gold;

        // Exchange Emoji
        for (const emoji of trade.requestorEmoji) {
            trade.requestor.balance.emoji.delete(emoji);
            trade.requestee.balance.emoji.add(emoji);
        }

        for (const emoji of trade.requesteeEmoji) {
            trade.requestor.balance.emoji.add(emoji);
            trade.requestee.balance.emoji.delete(emoji);
        }

        // Accepted, cannot be acted on
        trade.isAccepted = true;
    }
    
    removeInvalidOpenTrades();
    validatePendingTrades();
    resolvePublish?.();
}
