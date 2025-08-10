import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref(
    sessionStorage.getItem('employeeInfo')
      ? JSON.parse(sessionStorage.getItem('employeeInfo'))
      : '',
  )
  async function login(params) {
    const response = await useApi.auth.login(params)
    let redirectToEmployee = false
    let message = response.message
    if (response.code === useConstant.StatusCode.SUCCESS) {
      userInfo.value = response.data
      sessionStorage.setItem('employeeInfo', JSON.stringify(response.data))
      redirectToEmployee = true
    }
    return { redirectToEmployee, message }
  }
  async function checkLogin() {
    const response = await useApi.auth.checkLogin()
    let redirectToLogin = false
    if (response.code === useConstant.StatusCode.AUTH_ERROR) {
      userInfo.value = ''
      sessionStorage.removeItem('employeeInfo')
      redirectToLogin = true
    } else if (response.code === useConstant.StatusCode.SUCCESS) {
      userInfo.value = response.data
      sessionStorage.setItem('employeeInfo', JSON.stringify(response.data))
    }

    return redirectToLogin
  }
  async function logout() {
    const response = await useApi.auth.logout()
    let redirectToLogin = false
    if (response.code === useConstant.StatusCode.SUCCESS) {
      userInfo.value = ''
      sessionStorage.removeItem('employeeInfo')
      redirectToLogin = true
    }
    return redirectToLogin
  }
  async function resetPassword(params) {
    const response = await useApi.auth.resetPassword(params)
    let redirectToEmployee = false
    let message = response.message
    if (response.code === useConstant.StatusCode.SUCCESS) {
      userInfo.value = response.data
      sessionStorage.setItem('employeeInfo', JSON.stringify(response.data))
      redirectToEmployee = true
    }
    return { redirectToEmployee, message }
  }
  return { userInfo, login, checkLogin, logout, resetPassword }
})
