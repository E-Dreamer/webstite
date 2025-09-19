<script setup lang="ts">
import { useRouter } from 'vue-router'
import userInfoStore from '@/stores/userInfo.ts'
const router = useRouter()
const infoStore = userInfoStore()
function submit() {
  infoStore.login().then(() => {
    router.push({ path: '/' })
  })
}
</script>

<template>
  <div>
    这是登录页
    <button @click="submit">登录</button>
  </div>
</template>

<style scoped lang="less"></style>
