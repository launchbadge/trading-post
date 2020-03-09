import { sign } from "tweetnacl";
import { getCurrentUserPrivateKey } from "../store/user";

export function messageSignature(message: string): void {
    const messageJSON = JSON.stringify(message);
    const messageBytes: Uint8Array = new TextEncoder().encode(messageJSON);
    const userPrivateKey = getCurrentUserPrivateKey();
    // Pro Gamer Move: Use this private key as seed for signing keypair
    const keyPair = sign.keyPair.fromSeed(userPrivateKey!.toBytes());
    const signedMessage = sign(messageBytes, keyPair.secretKey);
}