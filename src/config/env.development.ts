// config/env.development.ts
// 本地环境配置
export default {
  env: "development",
  // baseUrl: 'https://flashmall-test.bljcoco.com/api',
  // baseUrl: 'https://qpyuznchmj.execute-api.ap-southeast-1.amazonaws.com',
  baseUrl: "https://foi2z9auma.execute-api.ap-southeast-1.amazonaws.com",
  imgUrl: "",
  provider: "https://data-seed-prebsc-1-s2.bnbchain.org:8545", // bsc provider
  // 币安测试链ID
  ethChainNumberId: 97,
  // 币安链配置
  chainConfig: {
    chainId: "0x61",
    chainName: "BNB Smart Chain Testnet",
    rpcUrls: ["https://data-seed-prebsc-1-s2.bnbchain.org:8545"],
    nativeCurrency: {
      name: "tBNB",
      symbol: "tBNB",
      decimals: 18
    },
    blockExplorerUrls: ["https://testnet.bscscan.com"]
  },
  // 时间周期
  datePeriod: 60,
  beiDatePeriod: 86400, // 花呗一天秒数
  // tokenAddress
  BNB: "0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F",
  // USDT: '0x2Feceadc05e412F3CAE0f884C8bA0AA87D5520dD',
  USDT: "0x56BB60cf0B3E21003097F1c348FFc4f58f42Ec04",

  MAI: "0xC42F240C256F5FB97346b9d69d10E2e1D77b2EBa",
  MUSD: "0x755e19FF2945572993dedef5A8C96C4cE73349E4",
  MCOIN: "0xb09053a2bB04bF463CBf18eddc60c30E8d5f0869",
  WMai: "0x42f35bD39D8735af8876F38fE385d9Ec714cf105",
  FMCP: "0xD5116405dA98490520cD7e54FeE47c80250B71e4", // 抵用券

  // contract
  flashMall: "0x382Dca6Ab0eed3C0cE5e01423331221aaA190AAD",
  order: "0xc911B2AE1043abFE2735A284EA1baa287dc3b326", // 商城订单
  swapPool: "0x492c31646a3ff2b65e34435169e8f25227EDcdaC", // 闪兑
  lendingPool: "0x666b5914b24Df348399D8B3D7fAd6032A2a377bB", // 借贷
  maiExchange: "0x5dceDa97Cc7e66CC22180ce137890c92Cb30EBa6", // mai-musd兑换
  otcOld: "0x0858f11B8Be3387D7fD1F3056A718e97Cc9E6d02", // otc交易
  otc: "0x0fdb71896dcd14296Cfdc3C8e1bbDfE4C8a11429",
  // 矩阵和nft合约地址
  matrix: "0x1f7aF457a2ECFc472AFa722EF1A20178271A6223", // 购买nft
  gold: "0x11562F76a579b1B52b0481c5c19D9902491FE41a",
  activity: "0x013cf205b8384A6338935710a91BEfe3FCB08437", // 活跃度模块
  luckyShop: "0x07E318d72bE172A8A8EC839b1316Aa581609427F", // 闪电一元购

  // otc代理合约
  otcAgent: "0x1F7E069Aa7E8FF1c6EF5D26711A9fC54C7bd04D3",
  // 免手续费OTC代理合约
  otcAgentFreeFee: "0xA72b566c58Bc5C0FC8D1CB426C02A4FBA845F424",
  // 存钱罐合约
  piggyBank: "0x853aB2a0E5cAfEdfa1A9fc8df3154cBE9213136C",
  // 儲值卡
  storedValue: "0x6c7FE425A50F776971893e25c74b4a3f07071290",
  storedValueProportion: 0.8,
  // huabei jiebei mai pledge
  bei: "0x52e508BBf5469804fE45c24C97288C0773d28cAb",

  /**** topics:start ****/
  // 抵用券膨胀
  voucherGrow:
    "0x9f102475944559f2d89b683f8e4b9bb0bbaf3eda1247d0fe4acc2900fb369725",
  // 收货返现
  voucherBack:
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
  /**** topics:end ****/
};
