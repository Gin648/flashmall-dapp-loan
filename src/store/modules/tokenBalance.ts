import { defineStore } from "pinia";

const useTokenBalanceStore = defineStore("tokenBalance", {
  state: () => {
    return {
      balances: {}
    };
  },
  actions: {
    addTokenBalance(token: string, balance: number) {
      this.balances[token] = balance;
    },
    clearBalance() {
      this.balances = {};
    }
  }
});

export default useTokenBalanceStore;
