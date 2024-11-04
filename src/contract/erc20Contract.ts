import Erc20Abi from "@/abi/Erc20.json";
import { contractConfig } from "./index";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import { getBalanceNumber, toWei } from "@/utils/formatBalance";
import { successResult } from "@/utils/ethersUtils";
import { toastMsg } from "@/utils/toast";
import { useAccount } from "@/hooks/useAccount";

export const erc20Contract = (address: string) => {
  contractConfig;
  const erc20Contract = contractConfig(Erc20Abi, address);
  const account = useAccount().getCurrentAccount();

  // 账户余额
  const balanceOf = async (address?: string) => {
    return await erc20Contract.read("balanceOf", true, address || account);
  };

  // 授权额度
  // @spender 合约地址
  const allowance = async (spender: string) => {
    const resp = await erc20Contract.read("allowance", false, account, spender);
    return successResult(
      getBalanceNumber(new BigNumber(resp ? resp.toString() : 0))
    );
  };

  // 授权
  // @spender 合约地址
  const approve = async (spender: string, amount?: any) => {
    const curAmount = amount > 0 ? toWei(amount) : ethers.MaxUint256;
    return await erc20Contract.write("approve", spender, curAmount);
  };

  // 转账
  // @spender 合约地址
  // @amount 数量
  const transfer = async (spender: string, amount: number) => {
    const tx = await erc20Contract.writeGas(
      "transfer",
      address || account,
      toWei(amount)
    );
    if (!tx.success) {
      toastMsg(tx.result);
    }
    return tx;
  };

  // 发行量
  const totalSupply = async () => {
    return await erc20Contract.read("totalSupply", true, 555);
  };
  /**
   *
   * @param {spender} 合约地址
   * @returns
   */
  const symbol = async () => {
    const resp = await erc20Contract.read("symbol", false);
    if (resp?.success === undefined) {
      return successResult(resp);
    } else {
      return resp;
    }
  };
  // decimals
  const decimals = async () => {
    const resp = await erc20Contract.read("decimals", false);
    if (resp?.success === undefined) {
      return resp;
    } else {
      return 18;
    }
  };

  return {
    erc20Contract,
    balanceOf,
    allowance,
    approve,
    transfer,
    totalSupply,
    symbol,
    decimals
  };
};

export default erc20Contract;
