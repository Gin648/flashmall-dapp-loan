import { ethers } from "ethers";

import { config } from "@/config";
import { erc20Contract } from "@/contract/erc20Contract";

// abi
import Erc20Abi from "@/abi/Erc20.json";
import FlashMallAbi from "@/abi/FlashMall.json";
import type { ContractRunner } from "ethers/providers";
import useStore from "@/store";

// provider
let provider;
try {
  provider = new ethers.BrowserProvider(window.ethereum);
} catch (error) {
  provider = new ethers.JsonRpcProvider(config.provider);
}

export const signer: ContractRunner = await provider.getSigner();

export const getContract = (abi: any, address: string, isLogin = true) => {
  const signerOrProvider = new ethers.Contract(address, abi, provider);
  if (isLogin) {
    const { accountStore } = useStore();
    if (
      !accountStore.sign.address ||
      !accountStore.sign.signature ||
      !accountStore.sign.message
    )
      return;
  }
  return signerOrProvider;
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
  const { accountStore } = useStore();
  if (
    !accountStore.sign.address ||
    !accountStore.sign.signature ||
    !accountStore.sign.message
  )
    return;
  return erc20Contract(address);
};

//给注册专用
export const getFlashParents = (address: string = config.flashMall) => {
  return getContract(FlashMallAbi, address, false);
};
