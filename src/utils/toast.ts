import { showToast } from "vant";

import i18n from "@/i18n";
export const toastMsg = error => {
  console.log("error0", error);

  try {
    const { t } = i18n.global;
    error =
      JSON.parse(JSON.stringify(error)).reason ||
      JSON.parse(JSON.stringify(error))?.message ||
      (error as string) ||
      "error";
    console.log("error1", error);

    // 截取最后一个: 后面的字符串
    const indexsss = error.lastIndexOf(":");
    let resolvesss = error.substring(indexsss + 1, error.length);
    resolvesss = resolvesss.replace(" ", "").replace(/(.*)\./, "$1");
    error =
      t(`errorMsg.${resolvesss}`).indexOf("errorMsg.") !== -1
        ? resolvesss
        : t(`errorMsg.${resolvesss}`);
    showToast(error);
  } finally {
    console.error(error);
  }
};
