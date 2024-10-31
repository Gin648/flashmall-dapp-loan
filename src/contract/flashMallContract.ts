import { ethers } from "ethers";
import { useAccount } from "@/hooks/useAccount";
import { failResult, successResult } from "@/utils/ethersUtils";
import { formatBigNumber, toWei } from "@/utils/formatBalance";
import { toastMsg } from "@/utils/toast";
import FlashMallAbi from "@/abi/FlashMall.json";
import { config } from "@/config";
import { contractConfig } from "./index";

const flashMallContract = () => {
  const ContractInstance = contractConfig(FlashMallAbi, config.flashMall);

  // parents 升级 用来判断用户是否注册
  const parents = async (address?) => {
    const account = useAccount().getCurrentAccount();
    const tempAddress = address || account;
    const resp = await ContractInstance.read("parents", false, tempAddress);
    return resp !== ethers.constants.AddressZero;
  };
  /**
   * trade 消费
   * merchant 商家，收款方
   * amount 金额
   * benefit 受益者 付款方（默认自己）
   * 例如：A赠送给B积分 A是收款，B是消费
   */
  const trade = async (merchant, amount, benefit?) => {
    const account = useAccount().getCurrentAccount();
    const tx = await ContractInstance.write(
      "trade",
      merchant,
      toWei(amount),
      benefit || account
    );
    if (!tx.success) {
      toastMsg(tx.result);
    }
    return tx;
  };

  // 註冊
  const register = async address => {
    const tx = await ContractInstance.write("register");
    if (!tx.success) {
      toastMsg(tx.result);
    }
    return tx;
  };

  return {
    trade,
    parents,
    register
  };
};

export default flashMallContract;
