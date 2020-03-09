import { Client, ConsensusMessageSubmitTransaction, ConsensusTopicId } from "@hashgraph/sdk";

const operatorId = "0.0.147555";

const privateKey = "302e020100300506032b657004220420c22f6ec83cecee9fc031e624bc3e93a53533f381d7cbf37bb36fa98efb2d5c6d";

const client = Client.forTestnet()
    .setOperator(operatorId, privateKey);

export async function submitMessage(topicId: ConsensusTopicId, message: object): Promise<void> {
    // Announce the public key to the network
    await new ConsensusMessageSubmitTransaction()
        .setTopicId(topicId)
        .setMessage(JSON.stringify(message))
        .execute(client);

    // TODO: In development we should fetch receipts as
    //       an added layer of bug checking
}
