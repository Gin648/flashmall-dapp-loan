<template>
  <div class="app-wrapper text-base">
    <router-view v-if="reloadStore.isRouterAlive" v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <LoginPop v-if="!accountStore.isLogin" @login="login" />
    <RegisterPop v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import useStore from "@/store";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { useAccount } from "@/hooks/useAccount";
import "vant/es/toast/style";

const { accountStore, reloadStore } = useStore();
const { listenWallet, connectWallet, login } = useAccount();
const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});
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
