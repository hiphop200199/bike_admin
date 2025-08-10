import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { useConstant } from '@/constants'

export const useAlertLBStore = defineStore('alertLB', () => {
  const isShow = ref(false)
  const message = ref('')
  const movement = ref(0)
  const direction = ref('')
  function open(msg, move, dir = null) {
    isShow.value = true
    message.value = msg
    movement.value = move
    direction.value = '/' + dir
  }
  function close() {
    isShow.value = false
    message.value = ''
    if (movement.value == useConstant.LBDirection.BACK) {
      router.push({ path: direction.value })
    } else if (movement.value == useConstant.LBDirection.RELOAD) {
      location.reload()
    }
    movement.value = 0
    direction.value = ''
  }
  return { isShow, message, open, close }
})
