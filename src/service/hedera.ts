import { AccountId, Client, ConsensusMessageSubmitTransaction, ConsensusTopicId, Ed25519PrivateKey } from "@hashgraph/sdk";
import { messageSignature } from "./crypto";
import { Message } from "../domain/event";

const operatorId = process.env.OPERATOR_ID;
const operatorPrivateKey = process.env.OPERATOR_KEY;

const client = Client.forTestnet()
    .setOperator(
        AccountId.fromString(operatorId!), 
        Ed25519PrivateKey.fromString(operatorPrivateKey!)
    );

export async function submitMessage(topicId: ConsensusTopicId, message: Message): Promise<void> {
    message = { ...message, signature: messageSignature(message) }
    
    const topicMessage = new ConsensusMessageSubmitTransaction()
        .setTopicId(topicId)
        .setMessage(new TextEncoder().encode(JSON.stringify(message)))
        .execute(client);
    
    const transaction = await topicMessage;

    if (process.env.NODE_ENV === "development") {
        await transaction.getReceipt(client);
    }
}
