"use strict";
// 'use strict';
// import 'dotenv/config';
// import Redis from 'ioredis';
// import Axios from 'axios';
// import pMap from 'p-map';
// import _ from 'lodash';
// import { TxLog, LCDClient } from '@terra-money/terra.js';
// import RedisSMQ from 'rsmq';
// import camelcaseObjectDeep from 'camelcase-object-deep';
// import { chains, fcds } from './utils/blockchain/chains.js';
// import {
//   addToDB,
//   createTradeDB,
//   dropDB,
//   TradeInfo,
//   destroyTradeDB
// } from './mysql_db_access.js';
// async function initDB(): Promise<Redis> {
//   // We start the db
//   return new Redis();
// }
// async function quitDB(db: Redis) {
//   // We start the db
//   db.quit();
// }
// async function getHashSetCardinal(db: Redis) {
//   return db.scard('p2p-trade-txshash');
// }
// async function hasTx(db: Redis, txHash: string): Promise<boolean> {
//   return (await db.sismember('p2p-trade-txshash', txHash)) == 1;
// }
// let terra = new LCDClient(chains[process.env.CHAIN!]);
// async function main() {
//   let db = await initDB();
//   await db.flushdb();
//   await dropDB();
//   await createTradeDB();
//   const lcd_address = 'http://localhost:1317/';
//   const fcd_address = 'http://localhost:3060';
//   const lcd = Axios.create({
//     baseURL: lcd_address
//   });
//   // We start querying after we left off
//   let continueQuerying = true;
//   do {
//     let offset = await getHashSetCardinal(db);
//     console.log(offset);
//     let response = await lcd.get('/cosmos/tx/v1beta1/txs', {
//       params: {
//         events: `wasm._contract_address='${process.env.P2P_TRADE_ADDRESS}'`,
//         'pagination.offset': offset
//       }
//     });
//     // We start by query only transactions that have already been analyzed
//     let txFilter = await Promise.all(
//       response.data.tx_responses.map(
//         async (tx: any) => !(await hasTx(db, tx.txhash))
//       )
//     );
//     let txToAnalyse = response.data.tx_responses.filter(
//       (_: any, i: number) => txFilter[i]
//     );
//     // Then we iterate over the transactions and get the trade_id and/or (trade_id, counter_id)
//     let idsToQuery: number[][] = txToAnalyse
//       .map((tx: any) => {
//         return tx.logs
//           .map((log: any): number[][] => {
//             let txLog = new TxLog(log.msg_index, log.log, log.events);
//             let trade_ids = txLog.eventsByType.wasm.trade_id?.map(
//               (id: string) => parseInt(id)
//             );
//             let counter_ids = txLog.eventsByType.wasm.counter_id?.map(
//               (id: string) => parseInt(id)
//             );
//             return _.unzip([trade_ids, counter_ids]);
//           })
//           .flat();
//       })
//       .flat();
//     // The we query the blockchain for trade info and put it into the database
//     await pMap(
//       _.compact(idsToQuery),
//       async (id: number[]) => {
//         if (id.length == 1) {
//           let [tradeId] = id;
//           // We query the trade_info
//           let tradeInfo = await terra.wasm.contractQuery(
//             process.env.P2P_TRADE_ADDRESS!,
//             {
//               trade_info: {
//                 trade_id: tradeId
//               }
//             }
//           );
//           // We add it to the database
//           await addToDB({
//             tradeId,
//             counterId: undefined,
//             tradeInfo: camelcaseObjectDeep(tradeInfo)
//           });
//         } else {
//           let [tradeId, counterId] = id;
//           // We query the trade_info
//           let tradeInfo: any = await terra.wasm.contractQuery(
//             process.env.P2P_TRADE_ADDRESS!,
//             {
//               trade_info: {
//                 trade_id: tradeId
//               }
//             }
//           );
//           // And the counter_trade info
//           let counterTradeInfo: TradeInfo = await terra.wasm.contractQuery(
//             process.env.P2P_TRADE_ADDRESS!,
//             {
//               counter_trade_info: {
//                 trade_id: tradeId,
//                 counter_id: counterId
//               }
//             }
//           );
//           // We add it to the database
//           await addToDB({
//             tradeId,
//             counterId: undefined,
//             tradeInfo: camelcaseObjectDeep(tradeInfo)
//           });
//           await addToDB({
//             tradeId,
//             counterId,
//             tradeInfo: camelcaseObjectDeep(counterTradeInfo)
//           });
//         }
//       },
//       { concurrency: 1 }
//     );
//     // We add the transaction hashes to the redis set :
//     await db.sadd(
//       'p2p-trade-txshash',
//       response.data.tx_responses.map((tx: any) => tx.txhash)
//     );
//     if (!txToAnalyse.length) {
//       continueQuerying = false;
//     }
//   } while (continueQuerying);
//   quitDB(db);
//   destroyTradeDB();
// }
// main();
