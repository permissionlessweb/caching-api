import Redis from "ioredis"
import { getDb } from "../db_access"

import { toExistingTokenKey } from './nftInfo'

export async function allTokensAPI(db: Redis, req: any, res: any){
    const network = req.params.network;
    const address = req.params.address;
    const existingNFTKey = toExistingTokenKey(network);
    await res.status(202).send(await getDb(db, existingNFTKey));
  }