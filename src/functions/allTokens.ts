import Redis from "ioredis"
import { getDb } from "../db_access"

import { toExistingTokenKey, toAllNFTInfoKey } from './nftInfo'

export async function allTokensAPI(db: Redis, req: any, res: any){
    const network = req.params.network;
    const address = req.params.address;
    const existingNFTKey = toExistingTokenKey(network);
    if(address){
      await res.status(202).send(
        (await getDb(db, existingNFTKey))[address]
      );
    }else{
      await res.status(202).send(
        (await getDb(db, existingNFTKey))
      );
    }
  }

export async function allNFTInfoAPI(db: Redis, req: any, res: any){
    const network = req.params.network;
    const address = req.params.address;
    const allNFTInfoKey = toAllNFTInfoKey(network);
    if(address){
      await res.status(202).send(
        (await getDb(db, allNFTInfoKey))[address]
      );
    }else{
      await res.status(202).send(
        (await getDb(db, allNFTInfoKey))
      );
    }
  }