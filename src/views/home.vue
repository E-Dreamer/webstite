<template>
  <div>菜单meta中的title:{{ route.meta.title }}</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(import.meta.env, 'VITE_API_BASE_URL')
</script>
<style lang="less" scoped></style>
