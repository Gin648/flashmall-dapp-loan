import { ethers } from "ethers";
import { showToast } from "vant";
import { BigNumber } from "@ethersproject/bignumber";

import { signer } from "./contractHelper";
import { toastMsg } from "@/utils/toast";

import useStore from "@/store";
import { config } from "@/config";
import { formatBigNumber } from "@/utils/formatBalance";

const ethereum: any = window.ethereum;
let provider;
try {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} catch (error) {
  provider = new ethers.providers.JsonRpcProvider(config.provider);
}

// 统一错误返回
export const failResult = <T extends Error | string>(
  result: T
): web3Result<T> => ({
  success: false,
  result
}); // 统一成功返回
export const successResult = <T>(result: T): web3Result<T> => ({
  success: true,
  result
});

export const connectWallet = async () => {
  const { accountStore } = useStore();
  try {
    if (!window.ethereum) {
      return connectWallet();
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    accountStore.changeAccount(accounts[0]);
    const ethChainId = await window.ethereum.request({ method: "eth_chainId" });
    const ethChainNumberId = ethers.utils.hexlify(
      parseInt(config.ethChainNumberId)
    );

    if (ethChainId !== ethChainNumberId) {
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [config.chainConfig]
        })
        .then(() => {
          location.reload();
        });
    }

    return successResult(accounts[0]);
  } catch (error) {
    accountStore.changeAccount("");
    return failResult(error);
  }
};

/**
 * 签名数据
 * @account 需要签名的账户
 * @data 需要签名的数据
 * @privatekey 私钥
 * @return 签名后的数据
 */
export const signData = async (message: string) => {
  const { accountStore } = useStore();
  if (!accountStore.account) await connectWallet();
  const signer = provider.getSigner();
  try {
    // const signature = await window.ethereum.request({
    //   method: 'personal_sign',
    //   params: [accountStore.account, message],
    // })
    const signature = await signer.signMessage(message);
    return successResult(signature);
  } catch (error: any) {
    showToast(error);
    return failResult(error);
  }
};
/**
 * 计算给定消息的哈希
 * @message 要进行哈希计算的消息
 * @return 哈希过的消息
 */
export const hashMessage = async (message: string) => {
  try {
    const resp = await ethers.utils.hashMessage(message);
    return successResult(resp);
  } catch (err) {
    console.error(err);
    return failResult(err);
  }
};

/**
 * @description: 大小写地址矫正
 * @param {*} address
 * @return {*}
 */
export const transLegalAddress = (address: string) => {
  const account = ethers.utils.getAddress(address);
  return account;
};

/**
 * 转账
 * @fromAddress 当前地址
 * @toAddress 目的地址
 * @value 数额
 */
export const transfer = async (toAddress, value, options = {}) => {
  const transaction = {
    from: ethereum.selectedAddress,
    to: toAddress,
    value: ethers.utils.parseEther(value)._hex,
    // "gas": "0x5208", // 21000
    // "gasPrice": "0x9184e72a000", // 10000000000000
    // data: ethers.utils.formatBytes32String('hahah'), // 文本
    // data: ethers.utils.hexlify(222), // 数字
    ...options
    // chainId: ethers.utils.parseEther('56')._hex
  };
  try {
    // const resp = await ethereum.request({ method: 'eth_sendTransaction', params: [transaction] })
    const resp = await signer.sendTransaction(transaction);
    // try {
    //    const resp1 =  await provider.waitForTransaction(resp)
    //    return successResult(resp1)
    // } catch (err) {
    //   return failResult(err)
    // }
    return successResult(resp);
  } catch (err) {
    toastMsg(err);
    return failResult(err);
  }
};

// 获取账户余额
export const getBalanceDefault = async (address?) => {
  const { accountStore } = useStore();
  try {
    const resp = await provider.getBalance(address || accountStore.account);
    return formatBigNumber(resp);
  } catch (error) {
    return 0;
  }
};

// add 10%
export const calculateGasMargin = (
  value: BigNumber,
  margin = 1000
): BigNumber => {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(margin)))
    .div(BigNumber.from(10000));
};

export const getCurrentBlock = async () => {
  const blockNumber = await provider.getBlockNumber();
  return blockNumber;
};

// metmask提供的可以直接在memask中添加自定义代币的方法
export const addToken = async tokenObj => {
  try {
    const resp = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenObj.address,
          symbol: tokenObj.symbol,
          decimals: 18,
          image: tokenObj.image ?? ""
        }
      }
    });
    return successResult(resp);
  } catch (error) {
    return failResult(error);
  }
};

// 添加自定义网络
export const addEthereumChain = async (rpc: string = "https://1rpc.io/bnb") => {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x38",
          chainName: "BSC Main",
          rpcUrls: [rpc],
          nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18
          },
          blockExplorerUrls: ["https://bscscan.com/"]
        }
      ]
    });
    // location.reload()
    showToast("Node added successfully!");
  } catch (error) {
    console.log(error);
  }
};

// 获取交易收据
export const getTransactionReceipt = async (transactionHash: string) => {
  try {
    const resp = await provider.getTransactionReceipt(transactionHash);
    return successResult(resp);
  } catch (error) {
    return failResult(error);
  }
};
