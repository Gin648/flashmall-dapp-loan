import type BigNumber from "bignumber.js";

export const toLowerCase = (value: string): string => {
  return value ? value.toLowerCase() : "";
};
// 货币小数 默认4位
export const formatBalance = (
  value: string | number | BigNumber,
  num: number = 4
) => {
  if (!value || +value < 0.0001) return 0;
  value = typeof value === "string" ? value : value.toString();
  const regex = new RegExp(`^\\d+(?:\\.\\d{0,${num}})?`);
  value = Number(value.match(regex));
  return value;
};

export function openLink(url?: string) {
  console.log(window.location);
  const openUrl = `${window.location?.origin}`;
  window.location.href = openUrl;
}
