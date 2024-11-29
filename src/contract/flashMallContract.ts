import { ethers } from "ethers";
import { useAccount } from "@/hooks/useAccount";
import { toastMsg } from "@/utils/toast";
import {
  getFlashMallContractInstance,
  getFlashParents
} from "@/utils/contractHelper";
import { failResult, successResult } from "@/utils/ethersUtils";

const flashMallContract = () => {
  const ContractInstance = getFlashMallContractInstance();
  const parentContractInstance = getFlashParents();
  const fixedGasPrice = ethers.parseUnits("1", "gwei"); // 设置为 1 Gwei
  const overrides = {
    gasPrice: fixedGasPrice
  };
  // parents 升级 用来判断用户是否注册
  const parents = async (address?) => {
    const account = useAccount()?.getCurrentAccount();
    const tempAddress = address || account;
    try {
      const resp = await parentContractInstance?.parents(tempAddress);
      return resp !== ethers.ZeroAddress;
    } catch (error) {
      console.log(error, "error");
      return true;
    }
  };

  // 註冊
  const register = async address => {
    try {
      const resp = await (
        await ContractInstance.register(address, overrides)
      ).wait();
      return successResult<string>(resp);
    } catch (error) {
      toastMsg(error);
      return failResult(error);
    }
  };

  return {
    parents,
    register
  };
};

export default flashMallContract;
