<template>
  <div class="z-10 flex items-center gap-1" @click="handleBack">
    <!-- <img src="@/assets/svg/Vector-arrow-back.svg" alt="" class="w-2"> -->
    <van-icon
      name="arrow-left"
      class="text-lg font-black"
      :class="{ white: isWhite }"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { openLink } from "@/utils/utils";
import { useRouter } from "vue-router";
const router = useRouter();
const props = withDefaults(
  defineProps<{
    isWhite?: boolean;
    url?: any;
  }>(),
  {
    isWhite: false
  }
);
const emits = defineEmits(["back"]);
const handleBack = () => {
  if (props.url) {
    emits("back");
    return router.replace(props.url);
  }
  try {
    if (window.history.state.back) {
      router.back();
    } else {
      // 没有上一页主应用
      openLink();
    }
  } catch (e) {
    router.push("/");
  }
  emits("back");
};
</script>

<style scoped lang="less">
.white {
  color: white;
}
</style>
