import Redis from "ioredis"
import { getDb } from "../db_access"

import { toExistingTokenKey, toAllNFTInfoKey } from './nftInfo'

export async function allTokensAPI(db: Redis, req: any, res: any){
    const network = req.params.network;
    const address = req.params.address;
    const existingNFTKey = toExistingTokenKey(network);

    let dbContent = await getDb(db, existingNFTKey)

    if(address){
      await res.status(200).send(
        dbContent?.[address] ?? {}
      );
    }else{
      await res.status(200).send(
        dbContent ?? {}
      );
    }
  }

export async function allNFTInfoAPI(db: Redis, req: any, res: any){
    const network = req.params.network;
    const address = req.params.address;
    const allNFTInfoKey = toAllNFTInfoKey(network);

    let dbContent = await getDb(db, allNFTInfoKey);

    if(address){
      await res.status(200).send(
        dbContent?.[address] ?? {}
      );
    }else{
      await res.status(200).send(
        dbContent ?? {}
      );
    }
  }