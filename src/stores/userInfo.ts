import {defineStore} from "pinia";
import { type Ref, ref } from 'vue'

const userInfoStore = defineStore('userInfo',()=>{
  const token:Ref<string> = ref('')
  const info:Ref<object> = ref({})
  return {token}
})

export default userInfoStore;
