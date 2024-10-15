import useReloadStore from "./modules/realod";
import useAccountStore from "./modules/account";

export default function useStore() {
  return {
    reloadStore: useReloadStore(),
    accountStore: useAccountStore()
  };
}

import { createPinia } from "pinia";
const store = createPinia();
export { store };
