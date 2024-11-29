<template>
  <div class="app-wrapper text-base">
    <router-view v-if="reloadStore.isRouterAlive" v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <LoginPop v-if="!accountStore.isLogin" @login="login" />
    <RegisterPop v-if="!isRegister" :show="!isRegister" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import useStore from "@/store";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { useAccount } from "@/hooks/useAccount";
import "vant/es/toast/style";
import flashMallContract from "./contract/flashMallContract";
const { parents } = flashMallContract();
const { accountStore, reloadStore } = useStore();
const { listenWallet, connectWallet, login } = useAccount();
const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});

const isRegister = ref(true);

// 获取用户是否注册
const getIsRester = async () => {
  if (!accountStore?.account) return;
  isRegister.value = await parents();
};

watch(
  () => accountStore?.sign,
  newValue => {
    if (newValue) {
      getIsRester();
    }
  },
  {
    immediate: true,
    deep: true
  }
);
onMounted(async () => {
  connectWallet();
  listenWallet();
});
</script>

<style lang="less" scoped>
@import "@/styles/mixin.less";

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style>
