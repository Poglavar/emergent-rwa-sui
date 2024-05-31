# emergent-rwa-sui

[Emergent.RWA](https://tinyurl.com/emergentrwa) is a platform for permissionless, do-it-yourself tokenization on Sui.
It utilizes the Attestation primitive (sets of which are Tokenization Recipes) and a Marketplace for them to enable anyone to tokenize anything.

Unique features:
* Permissionless from the ground up: no vendor lock in
* No enforceable restrictions on token transfer
* All data is stored onchain, all functionality is available by calling smart contracts
* Granularity and emergence (no obligatory steps to tokenize, market decides)

Components:

* Move contracts for creating (RWA) Nfts and Attestations
* Backend for reading/writing the blockchain
* Frontend for the UI

How to use:

1. Run the localnet
2. Run the sui explorer
3. Build and publish the two Move contracts
4. Run the backend server
5. Load the frontend HTML
