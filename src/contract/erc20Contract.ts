import { ethers } from "ethers";
import BigNumber from "bignumber.js";

import { getErc20ContractInstance } from "@/utils/contractHelper";
import {
  formatBigNumber,
  getBalanceNumber,
  toWei
} from "@/utils/formatBalance";
import { successResult, failResult } from "@/utils/ethersUtils";
import { toastMsg } from "@/utils/toast";
import { useAccount } from "@/hooks/useAccount";

export const erc20Contract = (address: string) => {
  const erc20Contract = getErc20ContractInstance(address);

  const account = useAccount().getCurrentAccount();

  const fixedGasPrice = ethers.utils.parseUnits("1", "gwei"); // 设置为 1 Gwei
  const overrides = {
    gasPrice: fixedGasPrice
  };

  // 账户余额
  const balanceOf = async (address?: string) => {
    try {
      const resp = await erc20Contract.balanceOf(address || account);
      return formatBigNumber(resp);
    } catch (error) {
      return 0;
    }
  };

  // 授权额度
  // @spender 合约地址
  const allowance = async (spender: string) => {
    try {
      const resp = await erc20Contract.allowance(account, spender);
      return successResult(
        getBalanceNumber(new BigNumber(resp ? resp.toString() : 0))
      );
    } catch (error) {
      return failResult(error);
    }
  };

  // 授权
  // @spender 合约地址
  const approve = async (spender: string, amount?: any) => {
    const curAmount = amount > 0 ? toWei(amount) : ethers.constants.MaxUint256;
    try {
      const tx = await (
        await erc20Contract.approve(spender, curAmount, overrides)
      ).wait();
      return successResult(tx);
    } catch (error) {
      toastMsg(error);
      return failResult(error);
    }
  };

  // 转账
  // @spender 合约地址
  // @amount 数量
  const transfer = async (spender: string, amount: number) => {
    try {
      const tx = await (
        await erc20Contract.transfer(
          spender,
          address || account,
          toWei(amount),
          overrides
        )
      ).wait();
      return successResult(tx);
    } catch (error: any) {
      toastMsg(error);
      return failResult(error);
    }
  };
  // 发行量
  const totalSupply = async () => {
    try {
      // debugger
      const balance = await erc20Contract.totalSupply();
      return formatBigNumber(balance);
    } catch (error) {
      return 0;
    }
  };
  /**
   *
   * @param {spender} 合约地址
   * @returns
   */
  const symbol = async () => {
    try {
      const resp = await erc20Contract.symbol();
      return successResult(resp);
    } catch (error) {
      return failResult(error);
    }
  };
  // decimals
  const decimals = async () => {
    try {
      const resp = await erc20Contract.decimals();
      return resp;
    } catch (error) {
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
