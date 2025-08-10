import { request } from './base'

const secondPrefix = 'employee'

export const getList = async (params) => {
  return await request.getList(secondPrefix, params)
}

export const get = async (id) => {
  return await request.get(secondPrefix, id)
}

export const add = async (params) => {
  return await request.add(secondPrefix, params)
}

export const edit = async (params) => {
  return await request.edit(secondPrefix, params)
}

export const editPassword = async (params) => {
  return await request.editPassword(secondPrefix, params)
}

export const destroy = async (id) => {
  return await request.destroy(secondPrefix, id)
}
