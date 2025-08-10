import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfirmLBStore = defineStore('confirmLB', () => {
  const isShow = ref(false)
  const message = ref('')
  const parameter = ref(0)
  let callback = null

  function open(msg, func, params) {
    isShow.value = true
    message.value = msg
    callback = func
    parameter.value = params
  }
  function close() {
    isShow.value = false
    message.value = ''
    parameter.value = 0
    callback = null
  }
  async function execute() {
    isShow.value = false
    callback(parameter.value)
    message.value = ''
    parameter.value = 0
    callback = null
  }
  return { isShow, message, open, close, execute }
})
