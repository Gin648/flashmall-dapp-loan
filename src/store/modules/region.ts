import { defineStore } from "pinia";

const useRegion = defineStore("region", {
  // 开启数据持久化
  persist: true,
  state: () => {
    return {
      country: "CN" // 国家
    };
  },
  actions: {
    changeCountry(country: string) {
      this.country = country;
    }
  }
});

export default useRegion;
