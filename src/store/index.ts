import useReloadStore from "./modules/realod";
import useAccountStore from "./modules/account";
import useTokenBalanceStore from "./modules/tokenBalance";
import useRegion from "./modules/region";

export default function useStore() {
  return {
    reloadStore: useReloadStore(),
    accountStore: useAccountStore(),
    tokenBalanceStore: useTokenBalanceStore(),
    regionStore: useRegion()
  };
}

import { createPinia } from "pinia";
const store = createPinia();
export { store };
