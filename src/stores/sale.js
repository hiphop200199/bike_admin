import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'

export const useSaleStore = defineStore('sale', () => {
  const list = ref([])
  const pagination = ref({})
  const info = ref({})

  async function getList(param) {
    const response = await useApi.sale.getList(param)
    if (response.code === useConstant.StatusCode.SUCCESS) {
      list.value = response.data.list
      pagination.value = response.data.pagination
    }
  }
  async function get(id) {
    const response = await useApi.sale.get(id)
    if (response.code === useConstant.StatusCode.SUCCESS) {
      info.value = response.data
    }
  }

  return { list, pagination, info, getList, get }
})
