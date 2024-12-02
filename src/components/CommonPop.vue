<template>
  <van-popup
    :show="show"
    teleport="body"
    :position="position"
    :styles="styles"
    :close-on-click-overlay="false"
    @open="() => emit('open')"
  >
    <div class="w-full h-[100%] p-5 bg-[#FEFFF9] overflow-hidden">
      <slot name="header" />
      <slot name="content" />
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { PopupPosition } from "vant";

withDefaults(
  defineProps<{
    show: boolean;
    name?: any;
    width?: string;
    noClose?: boolean;
    noHeader?: boolean;
    noBorder?: boolean;
    position?: PopupPosition;
    styles?: any;
  }>(),
  {
    position: "center",
    styles: {
      width: "80%"
    }
  }
);
const emit = defineEmits(["close", "open"]);
</script>

<style scoped lang="scss"></style>
