// import setten from './setten-env.js';

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

export let fcds: any = {
  devnet: 'http://localhost:3060',
  testnet: 'https://api-elgafar.atlasdao.zone',
  mainnet: 'https://rpc-stargaze.atlasdao.zone',
  // classic: 'https://columbus-fcd.terra.dev',
};

export const registered_nft_contracts: any = // https://assets.terra.money/cw721/contracts.json
  '';
