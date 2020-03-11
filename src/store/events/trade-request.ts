import { TradeRequestEvent, EventType } from "../../domain/event";
import { ConsensusTopicId } from "@hashgraph/sdk";
import * as hedera from "../../service/hedera";
import state from "../state";
import { Emoji, Gold } from "../../domain/tokens";
import { getCurrentUser } from "../user";
import { parseTrade, validateTrade } from "../../service/trade";

let resolvePublish: (() => void) | null = null;

export async function publish(payload: {
    requestorPublicKey: string;
    requesteePublicKey: string;
    requestorGold: Gold;
    requestorEmoji: Set<Emoji>;
    requesteeGold: Gold;
    requesteeEmoji: Set<Emoji>;
}): Promise<void> {
    const promise = new Promise((resolve) => {
        resolvePublish = resolve
    });

    await hedera.submitMessage(new ConsensusTopicId(state.topicId!), {
        type: EventType.TradeRequest,
        payload: {
            requesteePublicKey: payload.requesteePublicKey,
            requestorPublicKey: payload.requestorPublicKey,
            requesteeEmoji: Array.from(payload.requesteeEmoji.values()),
            requestorEmoji: Array.from(payload.requestorEmoji.values()),
            requestorGold: payload.requestorGold.toString(),
            requesteeGold: payload.requesteeGold.toString()
        }
    });

    await promise;
}

export function handle(event: TradeRequestEvent): void {
    const trade = parseTrade(event);
    
    if (trade != null) {
        state.network.trades.set(event.id, trade);
        const currentUserPublicKey = getCurrentUser()?.publicKey!;

        // Validate the trade
        const isValid = validateTrade(trade);

        // Trade involves us
        if (currentUserPublicKey === event.payload.requesteePublicKey ||
            currentUserPublicKey === event.payload.requestorPublicKey) {
                
                // If the trade is valid, add it to openTrades
                if (isValid) {
                    state.network.openTrades.push(event.id);
                }
        }

        // Resolve the last set promise (if any)
        resolvePublish?.();
    }
}
