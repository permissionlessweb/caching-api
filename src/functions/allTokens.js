import { getDb } from '../db_access.js';
import { toExistingTokenKey, toAllNFTInfoKey } from './nft.js';
export async function allTokensAPI(db, req, res) {
    var _a;
    const network = req.params.network;
    const address = req.params.address;
    const existingNFTKey = toExistingTokenKey(network);
    let dbContent = await getDb(db, existingNFTKey);
    if (address) {
        await res.status(200).send((_a = dbContent === null || dbContent === void 0 ? void 0 : dbContent[address]) !== null && _a !== void 0 ? _a : {});
    }
    else {
        await res.status(200).send(dbContent !== null && dbContent !== void 0 ? dbContent : {});
    }
}
export async function allNFTInfoAPI(db, req, res) {
    var _a;
    const network = req.params.network;
    const address = req.params.address;
    const allNFTInfoKey = toAllNFTInfoKey(network);
    let dbContent = await getDb(db, allNFTInfoKey);
    if (address) {
        await res.status(200).send((_a = dbContent === null || dbContent === void 0 ? void 0 : dbContent[address]) !== null && _a !== void 0 ? _a : {});
    }
    else {
        await res.status(200).send(dbContent !== null && dbContent !== void 0 ? dbContent : {});
    }
}
