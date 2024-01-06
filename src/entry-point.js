'use strict';
import express from 'express';
import 'dotenv/config';
import https from 'https';
import fs from 'fs';
import toobusy from 'toobusy-js';
import Redis from 'ioredis';
import Redlock from 'redlock';
import { nftInfoAPI } from './functions/nft.js';
import { allTokensAPI, allNFTInfoAPI } from './functions/allTokens.js';
import cors from 'cors'
const PORT = process.env.PORT;
const HTTPS_PORT = process.env.HTTPS_PORT;

const corsOptions = {
    origin: 'https://atlas.terp.network' 
  };

async function initDB() {
    // We start the db
    return new Redis();
}
async function initMutex(db) {
    const redlock = new Redlock(
    // You should have one client for each independent redis node
    // or cluster.
    [db], {
        // The expected clock drift; for more details see:
        // http://redis.io/topics/distlock
        driftFactor: 0.01,
        // The max number of times Redlock will attempt to lock a resource
        // before erroring.
        retryCount: 1,
        // the time in ms between attempts
        retryDelay: 200,
        // the max time in ms randomly added to retries
        // to improve performance under high contention
        // see https://www.awsarchitectureblog.com/2015/03/backoff.html
        retryJitter: 200,
        // The minimum remaining time on a lock before an extension is automatically
        // attempted with the `using` API.
        automaticExtensionThreshold: 500 // time in ms
    });
    return redlock;
}
// We start the server
const app = express();
app.listen(parseInt(PORT), () => {
    console.log("Serveur à l'écoute");
});
// Allow any to access this API.
// app.use(function (_req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });
app.use(function (_req, res, next) {
    if (toobusy()) {
        res.status(503).send("I'm busy right now, sorry.");
    }
    else {
        next();
    }
});
async function main() {
    const db = await initDB();
    let redlock = await initMutex(db);
    app.get('/nfts', cors(corsOptions), async (_req, res) => {
        await res.status(404).send('You got the wrong syntax, sorry mate');
    });
    //db.flushdb();
    // Query the current NFT database state and trigger update if necessary
    app.get('/:network/nft_info/:address/tokenId/:tokenId', cors(corsOptions), async (req, res) => {
        return nftInfoAPI(db, req, res);
    });
    // Query the current NFT database state and trigger update if necessary
    app.get('/:network/nft_info/:address/', cors(corsOptions), async (req, res) => {
        return allNFTInfoAPI(db, req, res);
    });
    // Query the current NFT database state and trigger update if necessary
    app.get('/:network/nft_info/',cors(corsOptions), async (req, res) => {
        return allNFTInfoAPI(db, req, res);
    });
    // Query all the migrated NFTs thus far
    app.get('/:network/all_tokens/:address', cors(corsOptions), async (req, res) => {
        return allTokensAPI(db, req, res);
    });
    // Query all the migrated NFTs thus far
    app.get('/:network/all_tokens/', cors(corsOptions), async (req, res) => {
        return allTokensAPI(db, req, res);
    });
    if (process.env.EXECUTION == 'PRODUCTION') {
        const options = {
            cert: fs.readFileSync('/home/illiquidly/identity/fullchain.pem'),
            key: fs.readFileSync('/home/illiquidly/identity/privkey.pem')
        };
        https.createServer(options, app).listen(parseInt(HTTPS_PORT));
    }
}
main();