<template>
  <VanPopup
    v-model:show="show"
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
        <span class="relative">{{ $t("qing-xian-deng-lu") }}</span>
      </div>
      <VanButton
        color="white"
        class="block m-auto h-[40px] min-w-[170px] btn-orange btn-shadow"
        :loading="loading"
        @click="
          () => {
            emits('login');
          }
        "
        >{{ $t("deng-lu") }}</VanButton
      >
    </div>
  </VanPopup>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { loading } from "@/hooks/useLoading";

const show = ref(true);
defineProps<{
  name?: any;
}>();
const emits = defineEmits(["login"]);
</script>

<style scoped lang="less">
//
</style>
