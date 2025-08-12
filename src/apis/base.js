import axios from 'axios'

const BASE_PREFIX = '/api/admin/'

const getList = async (secondPrefix, params) => {
  return (await axios.get(BASE_PREFIX + secondPrefix + '/get-list', { params: params })).data
    .response
}

const get = async (secondPrefix, id) => {
  return (await axios.get(BASE_PREFIX + secondPrefix + '/get/' + id)).data.response
}

const add = async (secondPrefix, params) => {
  return (await axios.postForm(BASE_PREFIX + secondPrefix + '/add', params)).data.response
}

const edit = async (secondPrefix, params) => {
  return (await axios.postForm(BASE_PREFIX + secondPrefix + '/edit', params)).data.response
}

const editPassword = async (secondPrefix, params) => {
  return (await axios.postForm(BASE_PREFIX + secondPrefix + '/edit-password', params)).data.response
}

const destroy = async (secondPrefix, id) => {
  return (await axios.delete(BASE_PREFIX + secondPrefix + '/' + id)).data.response
}

const getAllList = async (secondPrefix) => {
  return (await axios.get(BASE_PREFIX + secondPrefix + '/get-all-list')).data.response
}

const getListByVendor = async (secondPrefix, params) => {
  return (await axios.get(BASE_PREFIX + secondPrefix + '/get-list-by-vendor', { params: params }))
    .data.response
}

const login = async (params) => {
  return (await axios.post(BASE_PREFIX + 'login', params)).data.response
}

const getCaptcha = async () => {
  return (await axios.get(BASE_PREFIX + 'captcha')).data.response
}

const checkLogin = async () => {
  return (await axios.post(BASE_PREFIX + 'check-login')).data.response
}

const logout = async () => {
  return (await axios.post(BASE_PREFIX + 'logout')).data.response
}

const forgotPassword = async (params) => {
  return (await axios.post(BASE_PREFIX + 'forgot-password', params)).data.response
}

const resetPassword = async (params) => {
  return (await axios.post(BASE_PREFIX + 'reset-password', params)).data.response
}

export const request = {
  getList,
  get,
  add,
  edit,
  editPassword,
  destroy,
  getAllList,
  login,
  getCaptcha,
  getListByVendor,
  checkLogin,
  logout,
  forgotPassword,
  resetPassword,
}
