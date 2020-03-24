# Trading Post
> Demonstration of Non-Fungible Tokens (NFTs) and Fungible Tokens using Hedera Consensus Service (HCS) and Kabuto.

 * Install dependencies

   ```sh
   $ yarn
   ```

 * Run Envoy
 
   This is needed to proxy the gRPC API of a mirror node for use in a browser. To deploy this in production, one would
   want to run this on a server somewhere.

   Note that you may want to tweak which mirror node. The envoy configuration is setup to use Kabuto currently. See `envoy.yaml`.

   ```
   $ yarn envoy:up
   ```

 * Configure

   Copy `.env.sample` to `.env` and replace the values with your operator account and key and the topic you wish to use.
   If you leave topic unset and fill in the operator you can use `yarn topic` to create a new topic to use.

 * Run

   ```
   $ yarn serve
   ```
