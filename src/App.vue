<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopAppBar from '@/components/app/TopAppBar.vue';
import NavigationRail from '@/components/app/NavigationRail.vue';
import { useUserStore } from './stores';
import { onMounted } from 'vue';
import { snackbar } from 'mdui';

const user = useUserStore();

function autoRefeshToken() {
  setTimeout(() => {
    user.refreshToken().catch(err => {
      snackbar({
        message: err.message,
        placement: 'top',
      });
    })
    autoRefeshToken();
  }, 1000 * 60 * 10);
};

onMounted(() => {
  autoRefeshToken();
});
</script>

<template>
  <mdui-layout class="layout">
    <TopAppBar />

    <NavigationRail />

    <mdui-layout-main class="page-wrapper mdui-prose">
      <main class="page">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </mdui-layout-main>
  </mdui-layout>
</template>

<style lang="scss" scoped>
.layout {
  height: 100vh;
}

.page-wrapper {
  position: relative;
  height: 100%;
  background-color: rgb(var(--mdui-color-surface-container));

  .page {
    height: 98%;
    margin: 0 1rem 0 0;
    overflow: auto;
    border-radius: var(--mdui-shape-corner-medium);
    background-color: rgb(var(--mdui-color-background));
  }

  .page::-webkit-scrollbar {
    width: 0.8rem;
    height: 0.8rem;
    background-color: none;
  }

  .page::-webkit-scrollbar-thumb:active {
    background-color: rgba(0, 0, 0, .5);
    -webkit-box-shadow: inset 1px 1px 3px rgba(0, 0, 0, .35);
  }

  .page::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, .4);
    -webkit-box-shadow: inset 1px 1px 1px rgba(0, 0, 0, .25);
  }

  .page::-webkit-scrollbar-thumb {
    // border-radius: var(--mdui-shape-corner-medium);
    background-color: rgba(0, 0, 0, .2);
    -webkit-box-shadow: inset 1px 1px 0px rgba(0, 0, 0, .10), inset 0px -1px 0px rgba(0, 0, 0, .07);
  }

  .page::-webkit-scrollbar-track:hover {
    background-color: rgba(0, 0, 0, .1);
    -webkit-box-shadow: inset 0px 0px 0px rgba(0, 0, 0, .05), inset 0px 0px 0px rgba(0, 0, 0, .01);
  }

  .page::-webkit-scrollbar-track {
    border-radius: 0 var(--mdui-shape-corner-medium) var(--mdui-shape-corner-medium) 0;
    overflow: hidden;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
