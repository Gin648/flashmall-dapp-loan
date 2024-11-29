import axios from "axios";
import { Toast } from "vant";
import i18n from "../i18n";
import { config } from "@/config";
import useStore from "@/store";
import { useAccount } from "@/hooks/useAccount";
import type { ApiResponse } from "@/typings/request";

axios.defaults.timeout = 50000;

const request = <T>(
  method: string,
  url: string,
  params: any,
  needToken: boolean = true,
  headerContentType: string = "application/json",
  baseURL: string = config.baseUrl,
  showError: boolean = true
): Promise<ApiResponse<T>> => {
  const headers: any = {
    "Content-type": headerContentType
  };
  const { accountStore, regionStore } = useStore();
  headers.region = regionStore.country;
  headers.language = i18n.global.locale.value;
  if (accountStore.isSign) {
    headers.address = accountStore.sign.address.toLowerCase();
    headers.message = accountStore.sign.message;
    headers.signature = accountStore.sign.signature;
  }
  if (needToken) {
    if (!accountStore.isSign) {
      return new Promise(resolve => {
        resolve({
          code: -1,
          success: false,
          data: null,
          message: "Network exception"
        });
      });
    }
  }
  const { disConnectWallet } = useAccount();
  return new Promise(resolve => {
    axios({
      method,
      headers,
      baseURL: baseURL,
      url,
      timeout: 15000,
      params:
        method === "POST"
          ? {
              page: params?.page,
              size: params?.size
            }
          : method === "GET" || method === "DELETE"
            ? params
            : null, // 是即将与请求一起发送的 URL 参数
      data: method === "POST" || method === "PUT" ? params : null // 是作为请求主体被发送的数据
    })
      .then(res => {
        if (res.data.code === 1) {
          res.data.success = true;
          resolve(res.data);
        } else if (+res.data.code === -1) {
          // token失效
          if (needToken) {
            disConnectWallet();
          }
          resolve({
            code: -1,
            success: false,
            data: null,
            message: "Network exception"
          });
        } else {
          Toast.clear();
          if (showError) Toast.fail(res.data.msg);
          resolve({
            code: 0,
            success: false,
            data: null,
            message: "Network exception",
            failMsg: res.data.msg
          });
        }
      })
      .catch(error => {
        Toast.clear();
        let messageText = "";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          messageText = error.response.data.message;
        } else {
          messageText = "Network exception";
        }
        if (showError) Toast.fail(messageText);
        // reject(error)
        resolve({
          code: 500,
          success: false,
          data: null,
          message: "Network exception",
          failMsg: messageText
        });
      });
  });
};

export default request;
