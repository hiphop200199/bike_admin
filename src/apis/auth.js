import { request } from './base'

export const login = async (params) => {
  return await request.login(params)
}

export const getCaptcha = async () => {
  return await request.getCaptcha()
}

export const checkLogin = async () => {
  return await request.checkLogin()
}

export const logout = async () => {
  return await request.logout()
}

export const forgotPassword = async (params) => {
  return await request.forgotPassword(params)
}

export const resetPassword = async (params) => {
  return await request.resetPassword(params)
}
