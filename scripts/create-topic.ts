async function main(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    const dotenv = require("dotenv");
    dotenv.config();

    const {
        Client,
        ConsensusTopicCreateTransaction,
        Ed25519PrivateKey
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    } = require("@hashgraph/sdk");

    const operatorPrivateKeyString = process.env.OPERATOR_KEY;
    const operatorAccount = process.env.OPERATOR_ID;
    const operatorPrivateKey = Ed25519PrivateKey.fromString(operatorPrivateKeyString);
    const client = Client.forTestnet();
    client.setOperator(operatorAccount, operatorPrivateKey);

    const transactionId = await new ConsensusTopicCreateTransaction()
        .setTopicMemo("Trading Post Topic")
        .setMaxTransactionFee(100000000000)
        .setSubmitKey(operatorPrivateKey.publicKey)
        .execute(client);

    const transactionReceipt = await transactionId.getReceipt(client);
    const topicId = await transactionReceipt.getConsensusTopicId();

    console.log(`topicId = ${topicId}`);
    return;
}
void main();