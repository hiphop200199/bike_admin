import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const isShow = ref(false)
  function open() {
    isShow.value = true
  }
  function close() {
    isShow.value = false
  }
  return { isShow, open, close }
})
