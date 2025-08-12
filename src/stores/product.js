import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'

export const useProductStore = defineStore('product', () => {
  const list = ref([])
  const pagination = ref({})
  const info = ref({})

  async function getListByVendor(params) {
    const response = await useApi.product.getListByVendor(params)
    if (response.code === useConstant.StatusCode.SUCCESS) {
      list.value = response.data.list
    }
  }
  async function getAllList() {
    const response = await useApi.product.getAllList()
    if (response.code === useConstant.StatusCode.SUCCESS) {
      list.value = response.data.list
    }
  }
  async function getList(param) {
    const response = await useApi.product.getList(param)
    if (response.code === useConstant.StatusCode.SUCCESS) {
      list.value = response.data.list
      pagination.value = response.data.pagination
    }
  }
  async function get(id) {
    const response = await useApi.product.get(id)
    if (response.code === useConstant.StatusCode.SUCCESS) {
      info.value = response.data
    }
  }

  return { list, pagination, info, getList, get, getAllList, getListByVendor }
})
