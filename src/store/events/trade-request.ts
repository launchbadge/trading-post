import { TradeRequestEvent, EventType } from "../../domain/event";
import { ConsensusTopicId } from "@hashgraph/sdk";
import * as hedera from "../../service/hedera";
import state from "../state";
import BigNumber from "bignumber.js";
import { Emoji, Gold } from "../../domain/tokens";
import { getCurrentUser, getUser } from "../user";

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
    const requestorGold = new BigNumber(event.payload.requestorGold);
    const requesteeGold = new BigNumber(event.payload.requesteeGold);

    if (!(Array.isArray(event.payload.requesteeEmoji) && event.payload.requesteeEmoji.length > 0)) {
        if (!(requestorGold.isGreaterThan(0) || requesteeGold.isGreaterThan(0))) {
            // Not a valid TradeRequest
            return;
        }
    }

    state.network.trades.set(event.id, {
        id: event.id,
        validStartAt: event.timestamp,
        requestee: getUser(event.payload.requesteePublicKey)!,
        requestor: getUser(event.payload.requestorPublicKey)!,
        requesteeEmoji: new Set(event.payload.requesteeEmoji),
        requesteeGold,
        requestorEmoji: new Set(event.payload.requestorEmoji),
        requestorGold,
        isAccepted: false
    });

    const currentUserPublicKey = getCurrentUser()?.publicKey!;

    if (currentUserPublicKey === event.payload.requesteePublicKey ||
        currentUserPublicKey === event.payload.requestorPublicKey) {
        // Add this trade to the OPEN list if
        // it involves us
        state.network.openTrades.push(event.id);
    }

    // Resolve the last set promise (if any)
    resolvePublish?.();
}
