import { defineStore } from "pinia";

import type { Sign } from "@/typings/account";
import { toLowerCase } from "@/utils/utils";

const useAccountStore = defineStore("user", {
  // 开启数据持久化
  persist: {
    paths: ["account", "users", "store", "sign"]
  },
  state: () => {
    return {
      account: "",
      sign: {
        address: "",
        message: "",
        signature: ""
      },
      store: {
        id: "",
        merchant: "",
        pers: "",
        storeName: "",
        viewOnlyFlag: 0
      },
      userInfo: {} as any,
      users: {} as any
    };
  },
  getters: {
    isSign: state => {
      const { address, message, signature } = state.sign;
      if (
        address &&
        message &&
        signature &&
        toLowerCase(state.account) === toLowerCase(address)
      )
        return true;
      else return false;
    },
    isLogin: state => {
      const { address, signature, message } = state.sign;
      if (
        address &&
        message &&
        signature &&
        toLowerCase(state.account) === toLowerCase(address)
      )
        return true;
      else return false;
    },
    // 是否為店員僅查看客服
    isOnlyView: state => {
      return state.store?.viewOnlyFlag || 0;
    }
  },
  actions: {
    changeAccount(account: string) {
      this.account = account;
    },
    changeSign(sign: Sign) {
      this.sign = sign;
    },
    changeUsers(sign: Sign) {
      this.users[sign.address || this.account] = sign;
    },
    changeStore(store: any) {
      this.store = store;
    },
    changeUserInfo(userInfo) {
      this.userInfo = userInfo;
    }
  }
});

export default useAccountStore;
