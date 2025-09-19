<script setup lang="ts">
import customMenu from '@/components/menu.tsx'
import { RouterView, useRouter } from 'vue-router'
import userInfoStore from '@/stores/userInfo.ts'
const router = useRouter()
const infoStore = userInfoStore()
function logout() {
  infoStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="BasicLayout">
    <customMenu class="Menu" />
    <RouterView />
    <button @click="logout">退出登录</button>
  </div>
</template>

<style scoped lang="less">
.Menu {
  background: #000;
  color: #fff;
}
</style>
