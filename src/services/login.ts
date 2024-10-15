import request from "@/utils/request";

// 登錄
export const queryLogin = () => {
  return request("POST", "/login", "", false);
};
