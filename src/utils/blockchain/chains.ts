// import setten from './setten-env.js';
// import * as contracts from './registered.json';

export const chains: any = {
  devnet: {
    URL: 'http://localhost:1317',
    chainId: 'local-net'
  },
  testnet: {
    //URL: 'https://api-elgafar.atlasdao.zone/',
    URL: `https://rpc-elgafar.atlasdao.zone`,
    chainID: 'elgafar-1'
  },
  mainnet: {
    URL: 'https://rpc-stargaze.atlasdao.zone/',
    chainID: 'stargaze-1'
  }
};

export const fcds: any = {
  devnet: 'http://localhost:3060',
  testnet: 'https://api-elgafar.atlasdao.zone',
  mainnet: 'https://rpc-stargaze.atlasdao.zone',
};

export const registered_nft_contracts: any = '';//  contracts; // https://assets.terra.money/cw721/contracts.json
