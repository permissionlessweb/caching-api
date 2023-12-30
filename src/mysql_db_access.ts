// import knex from 'knex';

export type Asset = {
  [asset: string]: {
    address: string;
    amount?: number;
    tokenId?: string;
    denom?: string;
  };
};
// type TradeInfo = {
//   acceptedInfo?: any; // TODO correct this type
//   assetsWithdrawn: boolean;
//   associatedAssets: Asset[];
//   lastCounterId?: number;
//   additionalInfo: {
//     ownerComment: {
//       comment: string;
//       time: string;
//     };
//     time: string;
//     nftsWanted: string[];
//     traderComment?: {
//       comment: string;
//       time: string;
//     };
//   };
//   owner: string;
//   state: string;
//   whitelistedUsers: string[];
// };

// enum TradeState {
//   Created = 'Created',
//   Published = 'Published',
//   Countered = 'Countered',
//   Refused = 'Refused',
//   Accepted = 'Accepted',
//   Cancelled = 'Cancelled'
// }
// function stateToString(state: TradeState): string {
//   return TradeState[state];
// }

// interface Trade {
//   tradeId: number;
//   counterId?: number;
//   tradeInfo: TradeInfo;
// }

// interface UseTrades {
//   states?: TradeState[] | undefined;
//   owner?: string | undefined;
//   startAfter?: number | undefined;
//   limit?: number | undefined;
//   whitelistedUser?: string;
//   wantedNFT?: string;
//   containsToken?: string;
//   counterer?: string;
//   hasWhitelist?: boolean;
// }

// interface UseCounterTrades {
//   states?: TradeState[] | undefined;
//   owner?: string | undefined;
//   startAfter?: number | undefined;
//   limit?: number | undefined;
//   whitelistedUser?: string;
//   wantedNFT?: string;
//   containsToken?: string;
// }

// const knexDB = knex({
//   client: 'mysql2',
//   connection: {
//     host: '127.0.0.1',
//     user: 'illiquidly',
//     password: 'illiquidly',
//     database: 'TRADES'
//   }
// });

// async function destroyTradeDB() {
//   knexDB.destroy();
// }

// async function _createTradeInfo(table: any) {
//   table.increments('id').primary();
//   table.integer('last_counter_id');
//   table.string('owner_comment');
//   table.string('owner_comment_time');
//   table.string('time');
//   table.string('trader_comment');
//   table.string('trader_comment_time');
//   table.string('owner');
//   table.string('state');
//   table.boolean('assets_withdrawn');
//   table.integer('accepted_counter_trade_id');
// }

// async function createTradeDB() {
//   await knexDB.schema
//     .createTable('trades', (table: any) => {
//       _createTradeInfo(table);
//       table.integer('trade_id').notNullable();
//       table.unique('trade_id');
//     })
//     .catch(() => console.log('Trade table exists already'));

//   await knexDB.schema
//     .createTable('counter-trades', (table: any) => {
//       _createTradeInfo(table);
//       table.integer('trade_id').notNullable();
//       table.integer('counter_id').notNullable();
//       table.unique(['trade_id', 'counter_id']);
//     })
//     .catch(() => console.log('Counter Trade table exists already'));

//   await knexDB.schema
//     .createTable('trade_associated_assets', (table: any) => {
//       table.integer('id');
//       table.boolean('is_trade');
//       table.string('asset_type');
//       table.string('address');
//       table.integer('amount');
//       table.string('token_id');
//       table.string('denom');
//     })
//     .catch(() => console.log('Associated assets table exists already'));

//   await knexDB.schema
//     .createTable('whitelisted_users', (table: any) => {
//       table.integer('id');
//       table.boolean('is_trade');
//       table.string('user');
//     })
//     .catch(() => console.log('Whitelist table exists already'));

//   await knexDB.schema
//     .createTable('nfts_wanted', (table: any) => {
//       table.integer('id');
//       table.boolean('is_trade');
//       table.string('address');
//     })
//     .catch(() => console.log('NFTS wanted table exists already'));
// }

// async function dropDB() {
//   await knexDB.schema.dropTable('trades').catch(() => {});
//   await knexDB.schema.dropTable('counter-trades').catch(() => {});
//   await knexDB.schema.dropTable('trade_associated_assets').catch(() => {});
//   await knexDB.schema.dropTable('whitelisted_users').catch(() => {});
//   await knexDB.schema.dropTable('nfts_wanted').catch(() => {});
// }

// function getDBFields(tradeInfo: TradeInfo) {
//   return {
//     owner: tradeInfo.owner,
//     time: tradeInfo.additionalInfo.time,
//     last_counter_id: tradeInfo.lastCounterId,
//     owner_comment: tradeInfo.additionalInfo.ownerComment?.comment,
//     owner_comment_time: tradeInfo.additionalInfo.ownerComment?.time,
//     trader_comment: tradeInfo.additionalInfo.traderComment?.comment,
//     trader_comment_time: tradeInfo.additionalInfo.traderComment?.time,
//     state: tradeInfo.state,
//     accepted_counter_trade_id: tradeInfo.acceptedInfo?.counterId,
//     assets_withdrawn: tradeInfo.assetsWithdrawn
//   };
// }

// async function addToTradeDb({ tradeId, tradeInfo }: Trade) {
//   return await knexDB('trades')
//     .insert({
//       trade_id: tradeId,
//       ...getDBFields(tradeInfo)
//     })
//     .onConflict()
//     .merge(); // We erase if the data is already present
// }

// async function addToCounterTradeDb({ tradeId, counterId, tradeInfo }: Trade) {
//   return await knexDB('counter-trades')
//     .insert({
//       trade_id: tradeId,
//       counter_id: counterId,
//       ...getDBFields(tradeInfo)
//     })
//     .onConflict()
//     .merge(); // We erase if the data is already present
// }

// async function addToAssetsDB(
//   id: number,
//   { tradeInfo }: Trade,
//   isTrade: boolean
// ) {
//   // We remove all associated assetsx registered
//   await knexDB('trade_associated_assets').del().where({
//     id,
//     is_trade: isTrade
//   });

//   let associatedAssets = tradeInfo.associatedAssets.map((asset) => ({
//     id,
//     is_trade: isTrade,
//     asset_type: asset.asset,
//     address: asset.address,
//     amount: asset.amount,
//     token_id: asset.tokenId,
//     denom: asset.denom
//   }));
//   if (associatedAssets.length) {
//     return await knexDB('trade_associated_assets').insert(associatedAssets);
//   }
// }

// async function addToWhitelistedDB(
//   id: number,
//   { tradeInfo }: Trade,
//   isTrade: boolean
// ) {
//   // We remove all whiltelisted users registered
//   await knexDB('whitelisted_users').del().where({
//     id,
//     is_trade: isTrade
//   });

//   let whitelistedUsers = tradeInfo.whitelistedUsers.map((user) => ({
//     id,
//     is_trade: isTrade,
//     user
//   }));
//   if (whitelistedUsers.length) {
//     return await knexDB('whitelisted_users').insert(whitelistedUsers);
//   }
// }

// async function addToWantedNfts(
//   id: number,
//   { tradeInfo }: Trade,
//   isTrade: boolean
// ) {
//   // We remove all wanted nfts registered
//   await knexDB('nfts_wanted').del().where({
//     id,
//     is_trade: isTrade
//   });

//   let nftsWanted = tradeInfo.additionalInfo.nftsWanted.map((address) => ({
//     id,
//     is_trade: isTrade,
//     address
//   }));
//   if (nftsWanted.length) {
//     return await knexDB('nfts_wanted').insert(nftsWanted);
//   }
// }

// async function addToDB(trade: Trade) {
//   let id: number;
//   let isTrade: boolean;
//   // We first save
//   if (trade.counterId !== undefined) {
//     id = (await addToCounterTradeDb(trade))[0];
//     isTrade = false;
//   } else {
//     id = (await addToTradeDb(trade))[0];
//     isTrade = true;
//   }
//   await addToAssetsDB(id, trade, isTrade);
//   await addToWhitelistedDB(id, trade, isTrade);
//   await addToWantedNfts(id, trade, isTrade);
//   return id;
// }

// async function parseFromDB(
//   db_result: any,
//   isTrade: boolean
// ): Promise<TradeInfo> {
//   let associatedAssets = await getAssociatedAssets(db_result.id, isTrade);
//   let whitelistedUsers = await getWhitelistedUsers(db_result.id, isTrade);
//   let nftsWanted = await getNftsWanted(db_result.id, isTrade);

//   return {
//     acceptedInfo: {
//       counter_id: db_result.accepted_counter_trade_id
//     },
//     assetsWithdrawn: db_result.assets_withdrawn,
//     lastCounterId: db_result.last_counter_id,
//     associatedAssets: associatedAssets.map((asset) => ({
//       [asset.asset]: {
//         address: asset.address,
//         amount: asset.amount,
//         tokenId: asset.tokenId,
//         denom: asset.denom
//       }
//     })),
//     additionalInfo: {
//       ownerComment: {
//         comment: db_result.owner_comment,
//         time: db_result.owner_comment_time
//       },
//       time: db_result.time,
//       nftsWanted: nftsWanted.map((nft) => nft.address),
//       traderComment: {
//         comment: db_result.trader_comment,
//         time: db_result.trader_comment_time
//       }
//     },
//     owner: db_result.owner,
//     state: db_result.state,
//     whitelistedUsers: whitelistedUsers.map((user) => user.user)
//   };
// }

// async function getAssociatedAssets(id: number, isTrade: boolean) {
//   return knexDB('trade_associated_assets')
//     .select('*')
//     .where({ id, is_trade: isTrade });
// }
// async function getWhitelistedUsers(id: number, isTrade: boolean) {
//   return knexDB('whitelisted_users')
//     .select('*')
//     .where({ id, is_trade: isTrade });
// }
// async function getNftsWanted(id: number, isTrade: boolean) {
//   return knexDB('nfts_wanted').select('*').where({ id, is_trade: isTrade });
// }

// async function getTrade(filters?: TradeInfo) {
//   let trade_info = await knexDB('trades').select('*');
//   return await Promise.all(
//     trade_info.map(async (info) => ({
//       tradeId: info.trade_id,
//       tradeInfo: await parseFromDB(info, true)
//     }))
//   );
// }

// async function getCounterTrade(filters?: TradeInfo) {
//   let counterTradeInfo = await knexDB('counter-trades').select('*');
//   return await Promise.all(
//     counterTradeInfo.map(async (info) => ({
//       tradeId: info.trade_id,
//       counterId: info.counter_id,
//       tradeInfo: await parseFromDB(info, false)
//     }))
//   );
// }

// export {
//   createTradeDB,
//   addToDB,
//   dropDB,
//   TradeInfo,
//   destroyTradeDB,
//   getTrade,
//   getCounterTrade
// };
