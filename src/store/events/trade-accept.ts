import { TradeAcceptEvent } from "../../domain/event";
import * as hedera from "../../service/hedera";
import { ConsensusTopicId } from "@hashgraph/sdk";
import state from "../state";

export async function publish(tradeId: number): Promise<void> {
    await hedera.submitMessage(new ConsensusTopicId(state.topicId!), {
        type: "TradeAccept",
        payload: {
            tradeId,
        }
    });
}

export function handle(event: TradeAcceptEvent): void {
    // TODO: Verify that only the requestee can actually accept a transaction

    const trade = state.network.trades.get(event.payload.tradeId)!;

    // Exchange Gold
    trade.requestor.balance.gold = trade.requestor.balance.gold
        .minus(trade.requestorGold)
        .plus(trade.requesteeGold);

    trade.requestee.balance.gold = trade.requestee.balance.gold
        .minus(trade.requesteeGold)
        .plus(trade.requestorGold);

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
    const openTradeIndex = state.network.openTrades.indexOf(event.payload.tradeId);
    if (openTradeIndex >= 0) {
        state.network.openTrades.splice(openTradeIndex, 1);
    }

    // Mark the trade as accepted
    trade.isAccepted = true;
}
