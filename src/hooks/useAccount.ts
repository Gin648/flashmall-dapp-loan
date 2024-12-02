import { showToast } from "vant";

import useStore from "@/store";
import {
  connectWallet as ethersConnect,
  signData as ethersSign,
  hashMessage
} from "@/utils/ethersUtils";
import { useLoading } from "@/hooks/useLoading";
import useTokenBalanceStore from "@/store/modules/tokenBalance";
import { queryShopInfo } from "@/services/shop";

export const useAccount = () => {
  const { accountStore, reloadStore } = useStore();
  const { loadingToggle } = useLoading();

  const getCurrentAccount = () => {
    return accountStore.account;
  };

  // 链接
  const connectWallet = async () => {
    await ethersConnect();
    reloadStore.reload();
  };

  const { clearBalance } = useTokenBalanceStore();
  // 取消链接
  const disConnectWallet = () => {
    accountStore.changeAccount("");
    accountStore.changeSign({
      signature: "",
      address: "",
      message: ""
    });
    accountStore.changeStore({});
    accountStore.changeUserInfo({});
    clearBalance();
    reloadStore.reload();
  };

  // 签名
  const signData = async () => {
    const resp: any = await ethersConnect();
    if (!resp.success) return;
    const message = Math.random().toString(36).slice(-8);
    const signRes = await ethersSign(message);
    if (!signRes.success) {
      accountStore.changeAccount("");
      return showToast(signRes.result);
    }
    const signnature = signRes.result;

    const messageRes = await hashMessage(message);

    const messageHash = messageRes.result;
    const params = {
      address: accountStore.account,
      message: messageHash,
      signature: signnature
    };
    accountStore.changeSign(params);
    accountStore.changeUsers(params);
    reloadStore.reload();
  };

  // 登陆
  const login = async () => {
    loadingToggle(true, 0);
    if (!accountStore.isSign) {
      const resp: any = await ethersConnect();
      if (!resp.success) return;
      const message = `Welcomes_Flashmall_${new Date().getTime().toString().slice(0, 10)}`;
      const signRes = await ethersSign(message);
      if (!signRes.success) {
        loadingToggle(false);
        accountStore.changeAccount("");
        return showToast(signRes.result);
      }
      const signnature = signRes.result;

      const messageRes = await hashMessage(message);

      const messageHash = messageRes.result;
      const params = {
        address: accountStore.account,
        message: messageHash,
        signature: signnature
      };
      accountStore.changeSign(params);
      accountStore.changeUsers(params);
    }
    loadingToggle(false);
    reloadStore.reload();
  };

  // 监听钱包
  const listenWallet = async () => {
    console.log("listenWallet");

    // 账号切换
    try {
      window.ethereum.on("accountsChanged", async () => {
        console.log("账号切换");
        disConnectWallet();
        location.reload();
      });
      // 断开链接
      window.ethereum.on("disconnect", () => {
        disConnectWallet();
        location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 根据缓存获取当前的店铺信息，没有的话就通过接口获取
  const getCurrentStoreId: any = async () => {
    const { accountStore } = useStore();
    if (accountStore.store?.id) {
      return accountStore.store;
    } else {
      const resp = await queryShopInfo(accountStore.account);
      if (resp.success) {
        await accountStore.changeStore(resp.data);
        return resp.data;
      }
      return {};
    }
  };

  return {
    getCurrentAccount,
    connectWallet,
    listenWallet,
    disConnectWallet,
    signData,
    login,
    getCurrentStoreId
  };
};
