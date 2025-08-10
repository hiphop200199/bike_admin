import { request } from './base'

const secondPrefix = 'banner'

export const getList = async (params) => {
  return await request.getList(secondPrefix, params)
}

export const get = async (id) => {
  return await request.get(secondPrefix, id)
}

export const add = async (params) => {
  return await request.add(secondPrefix, params)
}

export const edit = async (params, id) => {
  return await request.edit(secondPrefix, params, id)
}

export const destroy = async (id) => {
  return await request.destroy(secondPrefix, id)
}
