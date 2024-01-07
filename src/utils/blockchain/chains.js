// import setten from './setten-env.js';
import * as contracts from './registered.json';
export const chains = {
    devnet: {
        URL: 'http://localhost:1317',
        chainId: 'local-net'
    },
    testnet: {
        URL: `https://rest.elgafar-1.stargaze-apis.com`,
        chainID: 'elgafar-1'
    },
    mainnet: {
        URL: 'https://stargaze-api.polkachu.com/',
        chainID: 'stargaze-1'
    }
};
export let fcds = {
    testnet: 'https://rpc.elgafar-1.stargaze-apis.com',
    mainnet: 'https://rpc.stargaze-apis.com/'
};
export const registered_nft_contracts =  contracts; // https://assets.terra.money/cw721/contracts.json
