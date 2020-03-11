import { TradeAcceptEvent, EventType, Message } from "../../domain/event";
import * as hedera from "../../service/hedera";
import { ConsensusTopicId, Ed25519PublicKey } from "@hashgraph/sdk";
import state from "../state";
import { Gold } from "../../domain/tokens";
import { validateSignature } from "../../service/crypto";
import { Trade } from "../../domain/trade";
import { validateTrade, removeInvalidOpenTrades } from "../../service/trade";
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
        _handle(trade);
    }
}

export function _handle(trade: Trade): void {
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
    trade.isValid = false;
    removeInvalidOpenTrades();
    resolvePublish?.();
}
