import { defineStore } from "pinia";

import type { Sign } from "@/typings/account";
import { toLowerCase } from "@/utils/utils";

const useAccountStore = defineStore("user", {
  // 开启数据持久化
  persist: {
    paths: ["account", "sign", "token", "store"]
  },
  state: () => {
    return {
      account: "",
      sign: {
        address: "",
        message: "",
        signature: ""
      },
      token: "",
      store: {
        id: "",
        merchant: "",
        pers: "",
        storeName: ""
      },
      userInfo: {} as any
    };
  },
  getters: {
    isSign: state => {
      const { account, sign } = state;
      if (
        account &&
        sign.address &&
        toLowerCase(account) === toLowerCase(sign.address)
      )
        return true;
      else return false;
    },
    isLogin: state => {
      const { account, sign, token } = state;
      if (
        account &&
        sign.address &&
        toLowerCase(account) === toLowerCase(sign.address) &&
        token
      )
        return true;
      else return false;
    }
  },
  actions: {
    changeAccount(account: string) {
      this.account = account;
    },
    changeSign(sign: Sign) {
      this.sign = sign;
    },
    changeToken(token: string) {
      this.token = token;
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
