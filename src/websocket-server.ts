// 'use strict';

// import express from 'express';
// import 'dotenv/config';
// import https from 'https';
// import fs from 'fs';
// import toobusy from 'toobusy-js';
// import Redis from 'ioredis';
// import Redlock from 'redlock';
// import Axios from 'axios';

// // import { WebSocketClient } from '@terra-money/terra.js';
// import {WebSocketClient } from '@cosmjs/cosmwasm-stargate'
// const RedisSMQ = require('rsmq');

// async function main() {
//   // First we create the Redis Queue to be able to broadcast message :
//   /*
//   const rsmq = new RedisSMQ();
//   const queueName = "p2p_trading_database"
//   rsmq.createQueue({ qname: queueName }, function (err: any, resp: any) {
//     if (err) {
//       console.error(err)
//       return
//     }

//     if (resp === 1) {
//       console.log("queue created")
//     }
//   });
//   */
//   const wsclient = new WebSocketClient(
//     'ws://terra-rpc.stakely.io:26657/websocket'
//   );

//   const lcd_address = 'http://localhost:1317/';
//   const fcd_address = 'http://localhost:3060';

//   const lcd = Axios.create({
//     baseURL: lcd_address
//   });

//   const fcd = Axios.create({
//     baseURL: fcd_address
//   });

//   // P2P Transaction tracker
//   wsclient.subscribe('NewBlock', {}, (data) => {
//     console.log('suid');
//   });
//   wsclient.subscribeTx(
//     { 'message.action': '/cosmwasm.wasm.v1.MsgExecuteContract' },
//     (data) => {
//       console.log('uiuiud');
//     }
//   );

//   // P2P Transaction tracker
//   wsclient.subscribeTx(
//     {
//       'message.action': '/cosmwasm.wasm.v1.MsgExecuteContract',
//       'wasm._contract_address': process.env.P2P_TRADE_ADDRESS!
//     },
//     async (data) => {
//       // If we get a new transaction on the contract, we send a message to the worker
//       /*
//       rsmq.sendMessage({ qname: queueName, message: "p2p_trading_interaction"}, function (err: any, resp: any) {
//         if (err) {
//           console.error(err)
//           return
//         }
//         console.log("Message sent. ID:", resp);
//       });
//       */
//     }
//   );

//   wsclient.start();
// }
// main();
