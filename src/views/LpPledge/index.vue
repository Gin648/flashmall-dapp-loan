<template>
  {{ accountStore?.account }}
  {{ $t("dui-huan") }}
  {{ $t("zi-chan") }}
  MC:{{ amount }}
  <ApproveButton
    :loading="loading"
    :approveAmount="10"
    :contract="config.flashMall"
    :token="config.MCOIN"
    :fallBack="submitFrom"
    class="btn mt-5 mb-1.5 block font-normal bg-[#FED73A] h-[50px] w-full px-4 text-base text-center leading-[50px]"
  >
    <span class="text-[#2E2008] text-base"> 转帐 </span>
  </ApproveButton>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { erc20Contract } from "@/contract/erc20Contract";
import { config } from "@/config";
import useStore from "@/store";
import ApproveButton from "@/components/ApproveButton.vue";
import flashMallContract from "@/contract/flashMallContract";

const { accountStore } = useStore();
const amount = ref(0);
const getBalance = async () => {
  const { balanceOf } = erc20Contract(config.MCOIN);
  amount.value = +(await balanceOf());
};

const { trade } = flashMallContract();

const loading = ref(false);
const submitFrom = async () => {
  loading.value = true;
  await trade("0x4E4B027778C48EA8A43e4e6473D8C630158B51e2", 10);
  loading.value = false;
};
onMounted(() => {
  getBalance();
});
</script>

<style scoped lang="less">
.btn {
  background: #fed73a;
  color: #2e2008;
}
</style>
