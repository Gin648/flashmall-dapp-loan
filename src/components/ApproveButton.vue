<template>
  <VanButton
    round
    :loading="loading || approveLoading"
    :disabled="isApprove && disabled"
    :class="`${classes ?? 'text-red-600 px-4 py-2 bg-gray3'}`"
    @click="onClick"
  >
    <div v-if="!isApprove">{{ $t("shou-quan") }}{{ symbol ?? null }}</div>
    <div v-else>
      <slot />
    </div>
  </VanButton>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { ref } from "vue";

import erc20Contract from "@/contract/erc20Contract";
import { Address } from "@/typings/web3";

const props = defineProps<{
  contract: Address;
  token: Address;
  fallBack?: () => void;
  loading: boolean;
  symbol?: string;
  approveAmount?: number;
  disabled?: boolean;
  classes?: string;
}>();

const approveLoading = ref<boolean>(false);
const allowance = ref(0);
const isApprove = computed(() => {
  return (
    (Number(allowance.value) > 0 &&
      Number(allowance.value) >= Number(props.approveAmount ?? 0)) ||
    props.approveAmount <= 0
  );
});

const tokenContract = computed(() => erc20Contract(props.token));

const getTokenIsApprove = async () => {
  approveLoading.value = true;
  allowance.value = +(await (
    await tokenContract.value.allowance(props.contract)
  ).result);
  // isApprove.value = Number(allowance) > 0 && Number(allowance) >= Number((props.approveAmount ?? 0))
  approveLoading.value = false;
};

const handleApprove = async () => {
  approveLoading.value = true;
  await tokenContract.value.approve(props.contract);
  await getTokenIsApprove();
};

const onClick = () => {
  isApprove.value ? props?.fallBack() : handleApprove();
};
watch(
  () => props.token,
  () => {
    getTokenIsApprove();
  }
);
onMounted(() => {
  getTokenIsApprove();
});
</script>

<style scoped lang="less">
//
</style>
