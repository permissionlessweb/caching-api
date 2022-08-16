import Redis from 'ioredis';
import { getDb, saveToDb } from "../db_access"
import { asyncAction } from "../utils/js/asyncAction";

import {
  getAllNFTInfo, 
} from "../utils/blockchain/nft_query.js";

import { sendBackError } from "../utils/js/sendBackError";


function toNFTInfoKey(network: string, address: string, tokenId: string) {
  return `nft_info:${tokenId}@${address}@${network}`;
}

export function toExistingTokenKey(network: string) {
  return `existing_tokens:${network}`;
}

export async function nftInfoAPI(db: Redis, req: any, res: any, processFunc: any){
    const address = req.params.address;
    const network = req.params.network;
    const tokenId = req.params.tokenId;

    let dbKey = toNFTInfoKey(network, address, tokenId);
    const existingNFTKey = toExistingTokenKey(network);
    let nftInfo = await getDb(db, dbKey);

    // If the nftInfo was saved in the db, we return it directly
    if(nftInfo){
      return await res.status(200).send(processFunc(nftInfo));
    }

    // Else we query it from the lcd
    let error = null;
    [error, nftInfo] = await asyncAction(getAllNFTInfo(network, address, tokenId))
    if(error){
      return await sendBackError(res, error);
    }      
    await res.status(200).send(processFunc(nftInfo));

    // We save the NFT info to the redis server
    await saveToDb(db, dbKey, nftInfo);

    // We save all tokens from a contract in a single array 
    let [_, allTokens] = await asyncAction(getDb(db, existingNFTKey))
    if(!allTokens){
    	allTokens = {};
    }
    if(!allTokens[address]){
    	allTokens[address] = []
    }
    allTokens[address].push(tokenId);
    saveToDb(db, existingNFTKey, allTokens)
}