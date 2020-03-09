import * as Vue from "vue";
import { ConsensusTopicId, Ed25519PublicKey } from "@hashgraph/sdk";
import { Network } from "../domain/network";
import { User } from "../domain/user";
import { AllEmoji } from "../domain/tokens";
import { Trade } from "../domain/trade";

export interface State {
    topicId: string | null;
    network: Network;
    currentUserPublicKey: Ed25519PublicKey;
}

export default Vue.reactive<State>({
    topicId: "0.0.193429",
    currentUserPublicKey: Ed25519PublicKey,
    network: {
        availableEmoji: new Set(AllEmoji.keys()),
        users: new Map<string, User>(),
        trades: new Map<number, Trade>(),
        openTrades: []
    },
});
