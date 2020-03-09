import state from "./state";
import { Ed25519PrivateKey, Ed25519PublicKey } from "@hashgraph/sdk";
import * as announce from "./events/announce";
import { User } from "../domain/user";

const userPrivateKeyStorageKey = "trading-post:self:key";

export function getCurrentUserPrivateKey(): Ed25519PrivateKey | null {
    if (state.currentUserPrivateKey == null) {
        const keyText = window.localStorage.getItem(userPrivateKeyStorageKey);
        if (keyText == null) {
            return null;
        }

        state.currentUserPrivateKey = Ed25519PrivateKey.fromString(keyText);
        state.currentUserPublicKey = state.currentUserPrivateKey.publicKey;
    }

    return state.currentUserPrivateKey as Ed25519PrivateKey;
}

export function getCurrentUser(): User | null {
    return getUser(getCurrentUserPrivateKey()?.publicKey?.toString() ?? "");
}

export function getUser(key: string): User | null {
    return state.network.users.get(key) ?? null;
}

// True if the current user exists locally (aka. visited the app before)
export function doesCurrentUserExistLocally(): boolean {
    return (getCurrentUserPrivateKey() ?? state.currentUserPrivateKey) != null;
}

// True if the user exists on the network (at this time)
export function doesCurrentUserExist(): boolean {
    return state.currentUserPrivateKey != null
        ? state.network.users.has(state.currentUserPrivateKey.publicKey.toString())
        : false;
}
// Create a new user object for the current visitor
export async function createNewUserIfNeeded(name: string) {
    if (doesCurrentUserExistLocally()) {
        // If we locally exist, let's assume that we also exist on the network
        return;
    }

    // Generate a new key to use
    state.currentUserPrivateKey = await Ed25519PrivateKey.generate();
    state.currentUserPublicKey = state.currentUserPrivateKey.publicKey;

    // Publish our current user to the network
    await announce.publish(state.currentUserPrivateKey.publicKey as Ed25519PublicKey, name);

    // Remember our key
    window.localStorage.setItem(userPrivateKeyStorageKey, state.currentUserPrivateKey.toString());
}
