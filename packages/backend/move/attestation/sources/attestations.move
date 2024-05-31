/*
    This module contains the logic that is used to create, verify, revoke and move around attestations.
    It is the core of the attestation system.

    An attestation is a statement that is made by an attester about a target blockhain object. Its properties are:
    - The attester
    - The target (optional)
    - The statement

    We represent attestations as a struct that contains these properties. The attester is a blockchan address,
    as is the target. The statement is a byte array.

    TODO:
    - change statement to Schema
    - create the contract or module for Schema creation (this one is for Attesting)
    - switch recepient maybe to target (who should own the attestation?)
    - maybe 
    - add revocation logic

    Remember the important EAS primitive:
    - 
*/

module attestation::attestation {  

    public struct Attestation has key {
        id: sui::object::UID, 
        attester: address,
        target: address,
        statement: vector<u8>
    }

public fun createAttestation(target: address, statement: vector<u8>, ctx: &mut TxContext) {

        // let attester = tx_context::sender(ctx);

        let attestation = Attestation {
            id: object::new(ctx),
            attester: tx_context::sender(ctx),
            target: target,
            statement: statement
        };

        // we should actually give it to the target...
        transfer::transfer(attestation, tx_context::sender(ctx));
    }

}
