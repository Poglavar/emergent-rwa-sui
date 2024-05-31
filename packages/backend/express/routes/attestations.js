require('dotenv').config({ path: ['.env', '../.env', '../../.env'] })

var express = require('express')
var router = express.Router()

const { getFullnodeUrl, SuiClient } = require('@mysten/sui.js/client')
const client = new SuiClient({ url: getFullnodeUrl(process.env.SUI_NETWORK) })
const { Ed25519Keypair } = require('@mysten/sui.js/keypairs/ed25519')
const { TransactionBlock } = require('@mysten/sui.js/transactions')

const localAddress1 = '0xf7ae71f84fabc58662bd4209a8893f462c60f247095bb35b19ff659ad0081462'

const getOwnedObjectsForAddress = async (req, res, next) => {

    const ownerAddress = req.params.address
    console.log('ownerAddress', ownerAddress)

    // get coins owned by an address
    const response = await client.getCoins({
        owner: ownerAddress
    })

    console.log(response)
    // get objects owned by and address
    const objects = await client.getOwnedObjects({
        owner: ownerAddress
    })
    // console.log('objects', JSON.stringify(objects))

    const itemHTML = (item) => {
        return '<div class="coinitem"><p>' + item.coinType + ': ' + item.balance + '</p></div>'
    }

    const htmlResponse = response.data.map(coin => itemHTML(coin))
    console.log(htmlResponse)
    console.log(htmlResponse.join(''))

    res.send(
        htmlResponse.map(item => item).join('')
    )
}

const getOwnedAttestationsForAddress = async (req, res, next) => {

    const ownerAddress = req.params.address
    console.log('ownerAddress', ownerAddress)
    const response = await client.getOwnedObjects({
        owner: ownerAddress
    })
    console.log('response', JSON.stringify(response))

    const itemHTML = (item) => {
        return '<div class="coinitem"><p> Object Id: ' + item.data.objectId + '</p></div>'
    }

    const htmlResponse = response.data.map(coin => itemHTML(coin))
    console.log(htmlResponse)
    console.log(htmlResponse.join(''))

    res.send(
        htmlResponse.map(item => item).join('')
    )
}

const getAllAttestations = async (req, res, next) => {
}

const createAttestation = async (req, res, next) => {
    const target = req.body.target
    const schema_id = req.body.schema_id

    const packageObjectId = '0xb750a6782acfb2babdc6f744dfc3ce16cbfac54c33c5aaa9e3ce78f17ee285e0'
    const moduleName = 'attestation'
    const functionName = 'createAttestation'

    const tx = new TransactionBlock()
    tx.moveCall({
        target: packageObjectId + '::' + moduleName + '::' + functionName,
        arguments: [tx.pure.address(target), tx.pure.string(schema_id)],
    })
    const result = await client.signAndExecuteTransactionBlock({
        signer: kp,
        transactionBlock: tx,
    })
    console.log({ result })

    const explorerBaseUrl = 'http://localhost:9001/address/'
    console.log('Explorer link', explorerBaseUrl + kp.getPublicKey().toSuiAddress())
}

const createNft = async (req, res, next) => {
    const nftName = req.body.nft_name
    const nftUri = req.body.nft_uri
    console.log('nftName', nftName)
    console.log('nftUri', nftUri)

    const phrase = process.env.SEED_PHRASE
    const kp = Ed25519Keypair.deriveKeypair(phrase, `m/44'/784'/0'/0'/0'`)
    console.log('Public key', kp.getPublicKey().toSuiAddress())
    // console.log('Private key', kp.getSecretKey())

    const packageObjectId = '0x0ec9790897d8580094243d00e7bccb6623d6928afae43dfade0ef5249c205420'
    const moduleName = 'nft'
    const functionName = 'createRwaNft'

    const tx = new TransactionBlock()
    tx.moveCall({
        target: packageObjectId + '::' + moduleName + '::' + functionName,
        arguments: [tx.pure.string(nftName), tx.pure.string(nftUri)],
    })
    const result = await client.signAndExecuteTransactionBlock({
        signer: kp,
        transactionBlock: tx,
    })
    console.log({ result })

    // http://localhost:9001/object/0xd260bc1925f65c2a75a92750ff3920e2ebbd8fe7411b23f3c6216cae5de99131

    const explorerBaseUrl = 'http://localhost:9001/object/'
    console.log('Explorer link', explorerBaseUrl + kp.getPublicKey().toSuiAddress())

    res.send('NFT created on Sui.')

}

// All the routes here start with '/attestations'
router.get('/', getAllAttestations)
router.get('/owned/:address', getOwnedAttestationsForAddress)

router.post('/create', createAttestation)
router.post('/create/nft', createNft)

module.exports = router
