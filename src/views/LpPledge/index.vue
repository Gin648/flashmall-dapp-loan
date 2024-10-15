<template>
  <div>{{ $t("demo.tabbar.home") }}</div>
  {{ accountStore?.account }}
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import useStore from "@/store";
const { accountStore } = useStore();
</script>

<style scoped></style>
