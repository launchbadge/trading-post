import { TradeRequestEvent, EventType } from "../../domain/event";
import { ConsensusTopicId } from "@hashgraph/sdk";
import * as hedera from "../../service/hedera";
import state from "../state";
import BigNumber from "bignumber.js";
import { Emoji, Gold } from "../../domain/tokens";
import { getCurrentUser, getUser } from "../user";
import { User } from "../../domain/user";

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

function hasSubset(superset: Set<Emoji>, subset: Set<Emoji>): boolean {
    for (const item of subset) {
        if (!superset.has(item)) {
            return false;
        }
    }

    return true;
}

export function handle(event: TradeRequestEvent): void {
    let requestee: User | null;
    let requestor: User | null;
    let requesteeGold: BigNumber;
    let requestorGold: BigNumber;
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

    if (requestee === null) {
        console.warn(`rejecting request ${JSON.stringify(event)}; unknown requestee`);
        return;
    }

    if (requestor === null) {
        console.warn(`rejecting request ${JSON.stringify(event)}; unknown requestor`);
        return;
    }

    if (requestorGold.isNegative() || requesteeGold.isNegative()) {
        console.warn(`rejecting request ${JSON.stringify(event)}; a gold amount is negative`);
        return;
    }

    // require a trade to at least do *something*
    const hasValue = requestorEmoji.size > 0
        || requesteeEmoji.size > 0
        || !requestorGold.isZero()
        || !requesteeGold.isZero();

    if (!hasValue) {
        console.warn(`rejecting request ${JSON.stringify(event)}; trade has no value`);
        // Not a valid TradeRequest
        return;
    }

    // ensure both parties have sufficient gold/emoji balances
    if (!hasSubset(requestee.balance.emoji, event.payload.requesteeEmoji)) {
        console.warn(`rejecting request ${JSON.stringify(event)}; requestee does not have requested emoji`);
        return;
    }

    if (!hasSubset(requestor.balance.emoji, event.payload.requestorEmoji)) {
        console.warn(`rejecting request ${JSON.stringify(event)}; requestor does not have requested emoji`);
        return;
    }

    if (requestee.balance.gold.isLessThan(requesteeGold)) {
        console.warn(`rejecting request ${JSON.stringify(event)}; requestee does not have sufficient balance`);
        return;
    }

    if (requestor.balance.gold.isLessThan(requestorGold)) {
        console.warn(`rejecting request ${JSON.stringify(event)}; requestor does not have sufficient balance`);
        return;
    }

    state.network.trades.set(event.id, {
        id: event.id,
        validStartAt: event.timestamp,
        requestee,
        requestor,
        requesteeEmoji,
        requesteeGold,
        requestorEmoji,
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
