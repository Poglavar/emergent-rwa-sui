require('dotenv').config({ path: ['.env', '../.env'] })

const { getFullnodeUrl, SuiClient } = require('@mysten/sui.js/client')
const { Ed25519Keypair } = require('@mysten/sui.js/keypairs/ed25519')
const { TransactionBlock } = require('@mysten/sui.js/transactions')
const client = new SuiClient({ url: getFullnodeUrl(process.env.SUI_NETWORK) })

const phrase = process.env.SEED_PHRASE
const kp = Ed25519Keypair.deriveKeypair(phrase, `m/44'/784'/0'/0'/0'`)
console.log('Public key', kp.getPublicKey().toSuiAddress())
// console.log('Private key', kp.getSecretKey())

const packageId = '0xdc9b8b53d431d6fa63c408f817b05aa80ad5aa638f06aef10a09594b8bf3ab9b'

const main = async () => {
    const packageObjectId = packageId
    const moduleName = 'nft'
    const functionName = 'createRwaNft'

    const name = 'House 123456'
    const supportingUri = 'https://example.com/house123456'

    const tx = new TransactionBlock()
    tx.moveCall({
        target: packageObjectId + '::' + moduleName + '::' + functionName,
        arguments: [tx.pure.string(name), tx.pure.string(supportingUri)],
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
