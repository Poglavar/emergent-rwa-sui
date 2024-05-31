require('dotenv').config({ path: ['.env', '../.env', '../../.env'] })

var express = require('express');
var router = express.Router();

const { getFullnodeUrl, SuiClient } = require('@mysten/sui.js/client')
const client = new SuiClient({ url: getFullnodeUrl(process.env.SUI_NETWORK) })

const attestationPackageId = '0xb750a6782acfb2babdc6f744dfc3ce16cbfac54c33c5aaa9e3ce78f17ee285e0'
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


router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', async function (req, res, next) {
});

router.get('/owned/:address', getOwnedAttestationsForAddress);

module.exports = router;
