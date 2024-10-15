// config/env.production.ts
// 正式环境配置
export default {
  env: "production",
  baseUrl: "https://l76ewxixca.execute-api.ap-southeast-1.amazonaws.com/",
  //baseUrl: 'https://api.flashmall.app/api', // https://flashmall.app
  imgUrl: "", // https://flashmall.app
  provider: "https://bsc-dataseed1.ninicoin.io", // bsc provider
  // 币安链ID
  ethChainNumberId: 56,
  // 币安链配置
  chainConfig: {
    chainId: "0x38",
    chainName: "BSC Main",
    rpcUrls: ["https://bsc-dataseed1.binance.org/"],
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18
    },
    blockExplorerUrls: ["https://bscscan.com/"]
  },
  // 时间周期
  datePeriod: 86400,
  beiDatePeriod: 86400, // 花呗一天秒数
  // tokenAddress
  BNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  USDT: "0x55d398326f99059fF775485246999027B3197955",
  MAI: "0x35803e77c3163FEd8A942536C1c8e0d5bF90f906",
  MUSD: "0x22a2C54b15287472F4aDBe7587226E3c998CdD96",
  MCOIN: "0x826923122A8521Be36358Bdc53d3B4362B6f46E5",
  FMCP: "0xe9aCD9896DD9F4a0F5B93C53fE61f1cE1F0464Bb", // 抵用券

  // contract
  flashMall: "0x1f40465Dce9a07A5273b4b63F5f9C31ff2bcBD9a",
  order: "0xF04b637966926c757ca4cA9D602814B8ed7BD873",
  swapPool: "0x71fa9ccd90af89D9D87bfD4D01BF263DFC70580C",
  lendingPool: "0xa6433855524027709FDfCA15937d9443d7989928", // 借贷
  maiExchange: "0x0663C4b19D139b9582539f6053a9C69a2bCEBC9f",
  otcOld: "0x89ffE796c387F41354e97aF91f563798Db847aA3", // otc交易
  otc: "0x54B04768a7f0a9cB797e4Ee1b33403488cE81B34", // otc交易
  // 矩阵和nft合约地址
  matrix: "0xB6D2B04befd1475975c3608ed839fBf26E45d6f4",
  gold: "0xDCe13DBA9C3F8A789D39dC5944709735C139A73c",
  activity: "0xe9Fa67363b56d2167C13f9BAF042B975539B47f5", // 活跃度模块
  luckyShop: "0xfcaEeE3B7E7318E31C94818F928Bac378D13f6c5", // 闪电一元购
  // otc代理合约
  otcAgent: "0x97aC2A1d0bcD6AAC0Fa0a98C710F2cf9149c53b1",
  // 免手续费OTC代理合约
  otcAgentFreeFee: "0xBEC9F485060652f3482D0ecb2FF2568Cf8b8d2c6",
  // 存钱罐合约
  piggyBank: "0xE2abeebEc12e82De4432dA0A2045391242Bd1684",
  // 儲值卡
  storedValue: "0x58165f52D47e320D25759D6fbb46D43a7E2A0F4e",
  storedValueProportion: 0.8,
  // huabei jiebei mai pledge
  bei: "0x12F2fBC79A16337043E2597f8F086A42F987af1F",

  /**** topics:start ****/
  // 抵用券膨胀
  voucherGrow:
    "0x9f102475944559f2d89b683f8e4b9bb0bbaf3eda1247d0fe4acc2900fb369725",
  // 收货返现
  voucherBack:
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
  /**** topics:end ****/
};
