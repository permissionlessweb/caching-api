import { last } from 'lodash';
import {AtlasCosmWasmClient} from './stargate'

// Stargate query to contracts
async function sendIndependentQuery(
  networkId: string,
  contractAddress: string,
  query: object
): Promise<any> {
  const endpoint = process.env.RPC_ENDPOINT!;
  const client = await AtlasCosmWasmClient.connect(endpoint)

  return client.queryContractSmart(contractAddress, query);
}

// queries cw721-base & sg721-base to get contract info
async function getAllNFTInfo(
  network: string,
  nftContractAddress: string,
  tokenId: string
): Promise<any> {
  const nftInfo = await sendIndependentQuery(network, nftContractAddress, {
    all_nft_info: {
      token_id: tokenId
    }
  });

  return nftInfo;
}

// returns num of tokens for a contract
async function getNumTokens(
  network: string,
  nftContractAddress: string
): Promise<any> {
  const nftInfo = await sendIndependentQuery(network, nftContractAddress, {
    num_tokens: {}
  });

  return nftInfo;
}

// fetches all tokens for a collection
async function getTokens(
  network: string,
  contractAddress: string,
  limit?: number,
  startAfter?: string
): Promise<string[]> {
  const { tokens } = await sendIndependentQuery(network, contractAddress, {
    all_tokens: {
      ...(limit ? { limit } : {}),
      ...(startAfter ? { start_after: startAfter } : {})
    }
  });
  return tokens;
}

// returns all owned tokens for a speific pubkey
const getAllTokens = async (network: string, address: string, limit = 100) => {
  let startAfter: string | undefined;
  const response: string[][] = [];

  const fetchUserTokensPart = async () => {
    const result: string[] = await getTokens(
      network,
      address,
      limit,
      startAfter
    );

    response.push(result);

    startAfter = last(result);

    if (startAfter) {
      await fetchUserTokensPart();
    }
  };

  await fetchUserTokensPart();

  return response.flat();
};

export { getAllNFTInfo, getNumTokens, getAllTokens };
