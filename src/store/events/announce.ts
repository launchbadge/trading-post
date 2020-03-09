import { AnnounceEvent, EventType } from "../../domain/event";
import { User } from "../../domain/user";
import { getUserName } from "../user";
import state from "../state";
import { Emoji, Gold } from "../../domain/tokens";
import { ConsensusTopicId, Ed25519PublicKey } from "@hashgraph/sdk";
import * as hedera from "../../service/hedera";
import BigNumber from "bignumber.js";

const resolvePublishByKey: Map<string, () => void> = new Map();

export async function publish(publicKey: Ed25519PublicKey, name: string): Promise<void> {
    const publicKeyText = publicKey.toString();

    const promise = new Promise((resolve) =>
        resolvePublishByKey.set(publicKeyText, resolve));

    await hedera.submitMessage(new ConsensusTopicId(state.topicId!), {
        type: EventType.Announce,
        payload: {
            publicKey: publicKeyText,
            name 
        }
    })

    await promise;
}

export function handle(event: AnnounceEvent): void {
    const user: User = {
        publicKey: event.payload.publicKey,
        balance: {
            emoji: take<Emoji>(state.network.availableEmoji, event.timestamp.valueOf(), 10),
            gold: new BigNumber(10000) as Gold,
        },
        name: event.payload.name
    };

    state.network.users.set(user.publicKey, user);
    // If someone is waiting for a resolution on an announce, trigger the promise
    resolvePublishByKey.get(event.payload.publicKey)?.();
}

// Pop a random N from a set using a seed
// Ensure that the random N are distributed throughout the Set (and not just N from the end)
function take<T>(all: Set<T>, seed: number, count: number): Set<T> {
    const chosen = new Set<T>();
    const available = Array.from(all);

    for (let i = 0; i < count; i += 1) {
        const choice = (seed + i) % (available.length - i);

        chosen.add(available[ choice ]);
        // @ts-ignore
        all.delete(choice);
    }

    return chosen;
}
