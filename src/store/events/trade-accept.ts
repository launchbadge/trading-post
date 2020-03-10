import { TradeAcceptEvent, EventType, Message } from "../../domain/event";
import * as hedera from "../../service/hedera";
import { ConsensusTopicId, Ed25519PublicKey } from "@hashgraph/sdk";
import state from "../state";
import { Gold } from "../../domain/tokens";
import { validateSignature } from "../../service/crypto";
import { Trade } from "../../domain/trade";
import { validateTrade } from "../../service/trade";
import { getTrade } from "../trade";

export async function publish(tradeId: number): Promise<void> {
    await hedera.submitMessage(new ConsensusTopicId(state.topicId!), {
        type: EventType.TradeAccept,
        payload: {
            tradeId,
        }
    });
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

    // Remove invalidated trades
    // Also marks trades with isValid: false
    const invalidTradeIds = state.network.openTrades.filter((id) => !validateTrade(getTrade(id)!))
    invalidTradeIds.map((id) => {
        const index = state.network.openTrades.indexOf(id);
        if (index >= 0) {
            state.network.openTrades.splice(index, 1);
        }
    });
}
