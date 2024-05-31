const { requestSuiFromFaucetV0, getFaucetHost } = require('@mysten/sui.js/faucet')

const localAddress1 = '0xf7ae71f84fabc58662bd4209a8893f462c60f247095bb35b19ff659ad0081462'

const main = async () => {

    // get tokens from the Devnet faucet server
    await requestSuiFromFaucetV0({
        // connect to Devnet
        host: getFaucetHost('localnet'),
        recipient: localAddress1
    })

    console.log('Faucet request successful')
}

main()