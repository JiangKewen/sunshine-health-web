import instance from './axios'

export const axios = (method, url, data, params, configs) => {
  return instance({
    url,
    method,
    data,
    params,
    ...configs
  })
}

// 后台-登录
export const postLogin = ({ data, params, configs } = {}) =>
  axios('post', '/api/back/login', data, params, configs)

// 后台-角色新增
export const postRole = ({ data, params, configs } = {}) =>
  axios('post', '/api/back/role/save', data, params, configs)
// 后台-角色更新
export const putRole = ({ data, params, configs } = {}) =>
  axios('post', '/api/back/role/update', data, params, configs)
// 后台-角色查询
export const deleteRole = ({ data, params, configs } = {}) =>
  axios('get', '/api/back/role/get', data, params, configs)
// 后台-角色分页
export const getRole = ({ data, params, configs } = {}) =>
  axios('get', '/api/back/role/page', data, params, configs)
