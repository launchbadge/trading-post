import { TradeAcceptEvent, EventType, Message } from "../../domain/event";
import * as hedera from "../../service/hedera";
import { ConsensusTopicId, Ed25519PublicKey } from "@hashgraph/sdk";
import state from "../state";
import { Gold } from "../../domain/tokens";
import { validateSignature } from "../../service/crypto";
import { Trade } from "../../domain/trade";

export async function publish(tradeId: number): Promise<void> {
    await hedera.submitMessage(new ConsensusTopicId(state.topicId!), {
        type: EventType.TradeAccept,
        payload: {
            tradeId,
        }
    });
}

export function handle(event: TradeAcceptEvent): void {
    const trade = state.network.trades.get(event.payload.tradeId)!;
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

    // Remove this trade from "Open" if there
    const openTradeIndex = state.network.openTrades.indexOf(trade.id);
    if (openTradeIndex >= 0) {
        state.network.openTrades.splice(openTradeIndex, 1);
    }

    // Mark the trade as accepted
    trade.isAccepted = true;
}
