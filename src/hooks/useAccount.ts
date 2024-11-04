import { showToast } from "vant";

import useStore from "@/store";
import {
  connectWallet as ethersConnect,
  signData as ethersSign,
  hashMessage
} from "@/utils/ethersUtils";
import { queryLogin } from "@/services/login";
import { useLoading } from "@/hooks/useLoading";
import useTokenBalanceStore from "@/store/modules/tokenBalance";

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
    accountStore.changeToken("");
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
    }

    const resp1: any = await queryLogin();

    loadingToggle(false);
    if (resp1.success) {
      accountStore.changeToken(resp1.data);
      reloadStore.reload();
    } else {
      accountStore.changeSign({
        signature: "",
        address: "",
        message: ""
      });
    }
    return resp1;
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

  return {
    getCurrentAccount,
    connectWallet,
    listenWallet,
    disConnectWallet,
    signData,
    login
  };
};
