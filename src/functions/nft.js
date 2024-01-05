import { getDb, saveToDb } from '../db_access.js';
import { asyncAction } from '../utils/js/asyncAction.js';
import { getAllNFTInfo } from '../utils/blockchain/nft_query.js';
import { sendBackError } from '../utils/js/sendBackError.js';
function toNFTInfoKey(network, address, tokenId) {
    return `nft_info:${tokenId}@${address}@${network}`;
}
export function toAllNFTInfoKey(network) {
    return `all_nft_info:${network}`;
}
export function toExistingTokenKey(network) {
    return `existing_tokens:${network}`;
}
export async function nftInfoAPI(db, req, res) {
    var _a;
    const address = req.params.address;
    const network = req.params.network;
    const tokenId = req.params.tokenId;
    const existingNFTKey = toExistingTokenKey(network);
    const allNFTInfoKey = toAllNFTInfoKey(network);
    let [_, allNFTInfo] = await asyncAction(getDb(db, allNFTInfoKey));
    // If the nftInfo was saved in the db, we return it directly
    if ((_a = allNFTInfo === null || allNFTInfo === void 0 ? void 0 : allNFTInfo[address]) === null || _a === void 0 ? void 0 : _a[tokenId]) {
        return await res.status(200).send(allNFTInfo[address][tokenId]);
    }
    // Else we query it from the lcd
    const [error, nftInfo] = await asyncAction(getAllNFTInfo(network, address, tokenId));
    if (error) {
        return await sendBackError(res, error);
    }
    await res.status(200).send(nftInfo.info);
    // We save all the token info from a contract in a single array
    if (!allNFTInfo) {
        allNFTInfo = {};
    }
    if (!allNFTInfo[address]) {
        allNFTInfo[address] = {};
    }
    allNFTInfo[address][tokenId] = nftInfo.info;
    saveToDb(db, allNFTInfoKey, allNFTInfo);
    // We save all tokens names from a contract in a single array
    let [__, allTokens] = await asyncAction(getDb(db, existingNFTKey));
    if (!allTokens) {
        allTokens = {};
    }
    if (!allTokens[address]) {
        allTokens[address] = [];
    }
    allTokens[address].push(tokenId);
    saveToDb(db, existingNFTKey, allTokens);
}
