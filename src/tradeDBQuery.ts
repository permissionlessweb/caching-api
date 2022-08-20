import {
  destroyTradeDB,
  getTrade,
  getCounterTrade
} from './mysql_db_access.js';

async function main() {
  let trades = await getTrade();
  console.log(trades.map((trade) => trade.tradeInfo.whitelistedUsers));
  let counter_trades = await getCounterTrade();
  console.log(counter_trades);
  destroyTradeDB();
}

main();
