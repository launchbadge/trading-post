import * as Vue from "vue";
import { Ed25519PublicKey, Ed25519PrivateKey } from "@hashgraph/sdk";
import { Network } from "../domain/network";
import { User } from "../domain/user";
import { AllEmoji } from "../domain/tokens";
import { Trade } from "../domain/trade";

export interface State {
    topicId: string | null;
    network: Network;
    currentUserPublicKey: Ed25519PublicKey | null;
    currentUserPrivateKey: Ed25519PrivateKey | null;
}

export default Vue.reactive<State>({
    topicId: process.env.TOPIC_ID || "0.0.193963",
    currentUserPublicKey: null,
    currentUserPrivateKey: null,
    network: {
        sequenceLength: 0,
        currentSequenceNumber: 0,
        availableEmoji: new Set(AllEmoji.keys()),
        users: new Map<string, User>(),
        trades: new Map<number, Trade>(),
        openTrades: []
    },
});
