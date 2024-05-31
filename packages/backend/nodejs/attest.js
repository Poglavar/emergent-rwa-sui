require('dotenv').config({ path: ['.env', '../.env'] })

const { getFullnodeUrl, SuiClient } = require('@mysten/sui.js/client')
const { Ed25519Keypair } = require('@mysten/sui.js/keypairs/ed25519')
const { TransactionBlock } = require('@mysten/sui.js/transactions')
const client = new SuiClient({ url: getFullnodeUrl(process.env.SUI_NETWORK) })

const phrase = process.env.SEED_PHRASE
const kp = Ed25519Keypair.deriveKeypair(phrase, `m/44'/784'/0'/0'/0'`)
console.log('Public key', kp.getPublicKey().toSuiAddress())
// console.log('Private key', kp.getSecretKey())

const attestationPackageId = '0x610ff24360f3a167db1299669f6e3c45a1c9e945422e5ddd20ba9339585c70b6'
const target = '0x0000000000000000000000000000000000000000000000000000000000000000'
const statement = 'I guarantee that I am who I am'

const main = async () => {
    const packageObjectId = attestationPackageId
    const moduleName = 'attestation'
    const functionName = 'createAttestation'

    const tx = new TransactionBlock()
    tx.moveCall({
        target: packageObjectId + '::' + moduleName + '::' + functionName,
        arguments: [tx.pure.address(target), tx.pure.string(statement)],
    })
    const result = await client.signAndExecuteTransactionBlock({
        signer: kp,
        transactionBlock: tx,
    })
    console.log({ result })

    const explorerBaseUrl = 'http://localhost:9001/address/'
    console.log('Explorer link', explorerBaseUrl + kp.getPublicKey().toSuiAddress())
}

main()
