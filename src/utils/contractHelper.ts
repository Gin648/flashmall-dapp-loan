import type { JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";

import { toLowerCase } from "./utils";

import { config } from "@/config";
import { erc20Contract } from "@/contract/erc20Contract";

// abi
import Erc20Abi from "@/abi/Erc20.json";
import FlashMallAbi from "@/abi/FlashMall.json";
const isLogin = () => {
  const user: any = JSON.parse(localStorage.getItem("user"));
  const account = user.account;
  const sign = user.sign;
  const token = user.token;
  if (
    account &&
    sign.address &&
    toLowerCase(account) === toLowerCase(sign.address) &&
    token
  )
    return true;
  else return false;
};

// provider
let provider;
try {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} catch (error) {
  provider = new ethers.providers.JsonRpcProvider(config.provider);
}

export const signer: JsonRpcSigner = provider.getSigner();

export const getContract = (abi: any, address: string) => {
  const signerOrProvider = signer;
  if (!isLogin()) return;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getErc20ContractInstance = (address: string) => {
  return getContract(Erc20Abi, address);
};

export const getFlashMallContractInstance = (
  address: string = config.flashMall
) => {
  return getContract(FlashMallAbi, address);
};

export const getUsdtContract = (address: string = config.USDT) => {
  if (!isLogin()) return;
  return erc20Contract(address);
};
