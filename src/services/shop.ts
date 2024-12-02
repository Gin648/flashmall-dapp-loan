import request from "@/utils/request";
import useStore from "@/store";
import type { ApiResponse } from "@/typings/request";

// 獲取店鋪信息通過地址
export const queryShopInfo = (address?): Promise<ApiResponse<any>> => {
  const { accountStore } = useStore();
  const add = address || accountStore.sign.address;
  return request("GET", "/store/getStoreInfo?address=" + add, "", false);
};
