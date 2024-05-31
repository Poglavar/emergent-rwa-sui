require('dotenv').config({ path: ['.env', '../.env'] })
// This script uses the SUI Typescript SDK to retrieve data from the blockchain

const { getFullnodeUrl, SuiClient } = require('@mysten/sui.js/client')
const client = new SuiClient({ url: getFullnodeUrl(process.env.SUI_NETWORK) })

const attestationPackageId = '0xb750a6782acfb2babdc6f744dfc3ce16cbfac54c33c5aaa9e3ce78f17ee285e0'
const localAddress1 = '0xf7ae71f84fabc58662bd4209a8893f462c60f247095bb35b19ff659ad0081462'

const checkAddressOwnership = async (ownerAddress) => {

    // get coins owned by an address
    const coins = await client.getCoins({
        owner: ownerAddress
    })
    // get objects owned by and address
    const objects = await client.getOwnedObjects({
        owner: ownerAddress
    })

    console.log(coins)
    console.log('objects', JSON.stringify(objects))
}

checkAddressOwnership(localAddress1)
