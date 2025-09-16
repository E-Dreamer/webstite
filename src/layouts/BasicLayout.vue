<script setup lang="ts">
import customMenu from '@/components/menu.tsx'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="BasicLayout">
    <customMenu class="Menu" />
    <RouterView />
  </div>
</template>

<style scoped lang="less">
.Menu {
  background: #000;
  color: #fff;
}
</style>
