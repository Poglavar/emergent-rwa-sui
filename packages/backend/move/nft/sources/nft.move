/*
    This module contains the logic that is used to create RWA NFTs.
*/

module nft::nft {  

    public struct Nft has key {
        id: sui::object::UID,
        name: vector<u8>,
        supporting_uri: vector<u8>
    }

public fun createRwaNft(name: vector<u8>, supporting_uri: vector<u8>, ctx: &mut TxContext) {

        // let attester = tx_context::sender(ctx);

        let nft = Nft {
            id: object::new(ctx),
            name: name,
            supporting_uri: supporting_uri
        };

        // we should actually give it to the target...
        transfer::transfer(nft, tx_context::sender(ctx));
    }

}
