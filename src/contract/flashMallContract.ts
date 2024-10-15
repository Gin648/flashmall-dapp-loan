import { ethers } from "ethers";

import { useAccount } from "@/hooks/useAccount";
import { getFlashMallContractInstance } from "@/utils/contractHelper";
import { failResult, successResult } from "@/utils/ethersUtils";
import { formatBigNumber, toWei } from "@/utils/formatBalance";
import { toastMsg } from "@/utils/toast";

const flashMallContract = () => {
  const ContractInstance = getFlashMallContractInstance();
  const fixedGasPrice = ethers.utils.parseUnits("1", "gwei"); // 设置为 1 Gwei
  const overrides = {
    gasPrice: fixedGasPrice
  };
  // musd
  const musd = async () => {
    try {
      const resp = await ContractInstance.musd();
      return successResult<string>(resp);
    } catch (error) {
      return failResult(error);
    }
  };

  /**
   * 获取消费者待领取的积分
   * @returns 消费者待领取的积分
   */
  const contributeAdds = async () => {
    try {
      const account = useAccount().getCurrentAccount();
      const resp = await ContractInstance.contributeAdds(account);
      return formatBigNumber(resp);
    } catch (error) {
      return 0;
    }
  };

  /**
   * 积分比例
   * @returns
   */
  const pointRate = async () => {
    try {
      const resp = await ContractInstance.pointRate();
      return resp / 1000;
    } catch (error) {
      return 0;
    }
  };
  /**
   * 获取商家者待领取的积分
   * @returns 商家者待领取的积分
   */
  const contributeSpeedUps = async () => {
    try {
      const account = useAccount().getCurrentAccount();
      const resp = await ContractInstance.contributeSpeedUps(account);
      return formatBigNumber(resp);
    } catch (error) {
      return 0;
    }
  };

  /*
   * 设置mcoin兑换musd的比例
   * setPointRate
   */

  const setPointRate = async rate => {
    rate = rate * 1000;
    try {
      const resp = await (await ContractInstance.setPointRate(rate)).wait();
      return successResult(resp);
    } catch (error) {
      toastMsg(error);
      return failResult(error);
    }
  };
  // point mcoin
  const point = async () => {
    try {
      const resp = await ContractInstance.point();
      return successResult<string>(resp);
    } catch (error) {
      return failResult(error);
    }
  };

  // parents 升级 用来判断用户是否注册
  const parents = async (address?) => {
    const account = useAccount().getCurrentAccount();
    const tempAddress = address || account;
    try {
      const resp = await ContractInstance.parents(tempAddress);
      return resp !== ethers.constants.AddressZero;
    } catch (error) {
      return false;
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
      console.log("error", error);

      toastMsg(error);
      return failResult(error);
    }
  };

  // 是否是會員
  const members = async (address?) => {
    const account = useAccount().getCurrentAccount();
    try {
      const resp = await ContractInstance.members(address || account);
      return resp;
    } catch (error) {
      return false;
    }
  };
  // 會員價格
  const memberPrice = async () => {
    try {
      const resp = await ContractInstance.memberPrice();
      return formatBigNumber(resp);
    } catch (error) {
      return 1000;
    }
  };
  // 開通會員
  const buyMember = async () => {
    try {
      const resp = await (await ContractInstance.buyMember(overrides)).wait();
      return successResult<string>(resp);
    } catch (error) {
      toastMsg(error);
      return failResult(error);
    }
  };

  // 商家让利比例
  const merchantDiscounts = async (address?) => {
    const account = useAccount().getCurrentAccount();
    try {
      const resp = await ContractInstance.merchantDiscounts(address || account);
      return resp / 10000;
    } catch (error) {
      return 0;
    }
  };

  /**
   * 获取返利比例基准
   * tradeContributeSelfRate
   * @returns 50000 / 10000
   */

  const tradeContributeSelfRate = async () => {
    try {
      const resp = await ContractInstance.tradeContributeSelfRate();
      return resp / 10000;
    } catch (error) {
      return 5;
    }
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
    try {
      const tx = await ContractInstance.trade(
        merchant,
        toWei(amount),
        benefit || account,
        overrides
      );
      return successResult<string>(tx);
    } catch (error) {
      toastMsg(error);
      return failResult(error);
    }
  };

  // 获取用户可提积分余额
  const pointBalances = async (address?) => {
    const account = useAccount().getCurrentAccount();
    try {
      const resp = await ContractInstance.pointBalances(address || account);
      return formatBigNumber(resp);
    } catch (error) {
      return 0;
    }
  };

  // 积分提现
  const pointWithdraw = async (amount, target) => {
    try {
      const resp = await (
        await ContractInstance.pointWithdraw(
          toWei(amount),
          Number(target),
          overrides
        )
      ).wait();
      return successResult<string>(resp);
    } catch (error) {
      toastMsg(error);
      return failResult(error);
    }
  };

  // 获取用户等级
  const memberLevels = async (address?) => {
    const account = useAccount().getCurrentAccount();
    try {
      const resp = await ContractInstance.memberLevels(address || account);
      return resp;
    } catch (error) {
      return 0;
    }
  };

  /**
   * 积分比例
   * @returns
   */
  const mcoinRate = async () => {
    try {
      const resp = await ContractInstance.pointRate();
      return resp / 1000;
    } catch (error) {
      return 0;
    }
  };
  // 积分释放领取
  const pointReleaseBatch = async (address?) => {
    const account = useAccount().getCurrentAccount();
    try {
      const resp = await ContractInstance.pointReleaseBatch(
        [address || account],
        overrides
      );
      return successResult<string>(resp);
    } catch (error) {
      toastMsg(error);
      return failResult(error);
    }
  };
  const filterTrade = async () => {
    const filterEvent = ContractInstance.filters.LogPointBalanceChange();
    try {
      const resp = await ContractInstance.queryFilter(
        filterEvent,
        -500,
        "latest"
      );
      return successResult(resp);
    } catch (error) {
      toastMsg(error);
      return failResult(error);
    }
  };
  // 获取当前用户的积分值
  const contributes = async (address?) => {
    const account = useAccount().getCurrentAccount();
    try {
      const resp = await ContractInstance.contributes(address || account);
      return formatBigNumber(resp);
    } catch (error) {
      return 0;
    }
  };
  return {
    musd,
    pointRate,
    setPointRate,
    point,
    parents,
    register,
    members,
    memberPrice,
    buyMember,
    merchantDiscounts,
    tradeContributeSelfRate,
    trade,
    pointBalances,
    pointWithdraw,
    memberLevels,
    mcoinRate,
    pointReleaseBatch,
    filterTrade,
    contributes,
    contributeAdds, //消费者待领取的积分
    contributeSpeedUps //商家待领取的积分
  };
};

export default flashMallContract;
