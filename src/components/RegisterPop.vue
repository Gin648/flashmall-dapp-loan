<template>
  <VanPopup
    v-model:show="isRegister"
    style="
      background: transparent;
      width: 80%;
      min-width: 280px;
      max-width: 325px;
    "
    :close-on-click-overlay="false"
  >
    <img
      src="@/assets/images/mascot/3.png"
      class="w-[105px] mx-auto mb-[-23px] relative z-10"
    />
    <div class="w-[80%] text-center bg-white rounded-lg mx-auto pb-5">
      <div
        class="h-[80px] flex justify-center items-center relative overflow-hidden"
      >
        <img class="absolute w-full h-full" src="@/assets/images/topPop.png" />
        <span class="relative">{{ $t("invite.register") }}</span>
      </div>
      <VanField
        v-model="inviteAddress"
        :placeholder="$t('invite.pleaseInputInvite')"
      />
      <van-button
        class="mt-2 w-[90%] mx-auto btn-orange btn-shadow text-white"
        :loading="btnLoading"
        :disabled="!inviteAddress"
        @click="handleRegister"
      >
        {{ $t("invite.clickRegister") }}</van-button
      >
      <!-- <div v-if="!inviteAddress">{{ $t('invite.registerTip') }}</div>
      <template v-else>
         <van-button class="mt-2 w-[90%] mx-auto btn-orange btn-shadow text-white" @click="handleRegister" :loading="btnLoading">
        {{$t('invite.clickRegister')}}
      </van-button>
      </template> -->
    </div>
  </VanPopup>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

import useStore from "@/store";
import flashMallContract from "@/contract/flashMallContract";

const { accountStore, reloadStore } = useStore();
const { parents, register } = flashMallContract();

const route = useRoute();
const inviteAddress = ref(null);

watch(
  () => route,
  newValue => {
    if (newValue) {
      inviteAddress.value = newValue.query.invite || "";
    }
  },
  {
    immediate: true,
    deep: true
  }
);

const isRegister = ref(false);
const btnLoading = ref(false);
const handleRegister = async () => {
  btnLoading.value = true;
  const resp = await register(inviteAddress.value);
  btnLoading.value = false;
  if (!resp.success) return;
  reloadStore.reload();
  getIsRester();
};

// 获取用户是否注册
const getIsRester = async () => {
  if (!accountStore.account) return;
  isRegister.value = !(await parents());
};

onMounted(() => {
  setTimeout(() => {
    getIsRester();
  }, 150);
});
</script>

<style scoped lang="less">
:deep(.van-field__control) {
  padding: 5px 10px;
  background: #fff8ec;
  color: #26151562 !important;
  border-radius: 10px;
}
</style>
