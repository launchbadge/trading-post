import { sign, hash } from "tweetnacl";
import util from "tweetnacl-util"
import { getCurrentUserPrivateKey } from "../store/user";
import { Event, Message } from "../domain/event";

function currentKeyPair(): any {
    const userPrivateKey = getCurrentUserPrivateKey();
    return sign.keyPair.fromSeed(userPrivateKey!.toBytes());
}

function currentSecretKey(): Uint8Array {
    const keyPair = currentKeyPair();
    return keyPair.secretKey;
}

function currentPublicKey(): Uint8Array {
    const keyPair = currentKeyPair();
    return keyPair.publicKey;
}

function hashMessage(message: Message): Uint8Array {
    const messageJSON = JSON.stringify(message);
    const messageBytes: Uint8Array = new TextEncoder().encode(messageJSON);
    return hash(messageBytes);
}

export function messageSignature(message: Message): string {
    const hashedMessage = hashMessage(message);
    const secretKey = currentSecretKey();
    return util.encodeBase64(sign.detached(hashedMessage, secretKey));
}

export function validateSignature(event: Event, publicKey?: Uint8Array): boolean {
    if (publicKey == null) {
        publicKey = currentPublicKey();
    }

    const message: Message = { type: event.type, payload: event.payload };
    const hashedMessage = hashMessage(message);
    const signatureBytes = util.decodeBase64(event.signature);
    const decoded = sign.detached.verify(hashedMessage, signatureBytes, publicKey);
    if (decoded != null) return true;
    return false;
}