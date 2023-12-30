import {
    CosmWasmClient,
      WasmExtension,
    } from '@cosmjs/cosmwasm-stargate';
    import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
    
    
    class AtlasCosmWasmClient extends CosmWasmClient {
      constructor(tmClient: Tendermint34Client | undefined) {
        super(tmClient);
      }
    }
    export { AtlasCosmWasmClient };