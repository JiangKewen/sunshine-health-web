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

// 后台-上传文件
export const postFile = ({ data, params, configs } = {}) =>
  axios('post', '/api/common/upload/submit', data, params, configs)

// 角色管理

// 后台-角色新增
export const postRole = ({ data, params, configs } = {}) =>
  axios('post', '/api/back/role/save', data, params, configs)
// 后台-角色更新
export const putRole = ({ data, params, configs } = {}) =>
  axios('post', '/api/back/role/update', data, params, configs)
// 后台-角色查询
export const getRoleDetail = ({ data, params, configs } = {}) =>
  axios('get', '/api/back/role/get', data, params, configs)
// 后台-角色分页
export const getRoleList = ({ data, params, configs } = {}) =>
  axios('get', '/api/back/role/page', data, params, configs)
// 后台-角色删除
export const delRole = ({ data, params, configs, id } = {}) =>
  axios('delete', `/api/back/role/delete/${id}`, data, params, configs)
// 后台-角色列表
export const getRoleAll = ({ data, params, configs } = {}) =>
  axios('get', `/api/back/role/listRole`, data, params, configs)

// 用户管理

// 后台-用户新增
export const postUser = ({ data, params, configs } = {}) =>
  axios('post', '/api/back/user/save', data, params, configs)

// 后台-用户分页
export const getUserList = ({ data, params, configs } = {}) =>
  axios('get', '/api/back/user/page', data, params, configs)

// 后台-用户更新
export const putUser = ({ data, params, configs } = {}) =>
  axios('post', '/api/back/user/update', data, params, configs)

// 后台-用户查询
export const getUserDetail = ({ data, params, configs } = {}) =>
  axios('get', '/api/back/user/get', data, params, configs)

// 后台-用户删除
export const delUser = ({ data, params, configs, id } = {}) =>
  axios('delete', `/api/back/user/delete//${id}`, data, params, configs)

// 档案管理

// 后台-档案新增
export const postPerson = ({ data, params, configs } = {}) =>
  axios('post', '/api/back/person/save', data, params, configs)

// 后台-档案更新
export const putPerson = ({ data, params, configs } = {}) =>
  axios('post', '/api/back/person/update', data, params, configs)

// 后台-档案分页
export const getPersonPage = ({ data, params, configs } = {}) =>
  axios('get', '/api/back/person/page', data, params, configs)

// 后台-档案详情
export const getPersonDetail = ({ data, params, configs } = {}) =>
  axios('get', '/api/back/person/info', data, params, configs)

// 后台-档案删除
export const delPerson = ({ data, params, configs } = {}) =>
  axios('delete', '/api/back/person/delete', data, params, configs)

// 报告管理

// 后台-报告新增
export const postReport = ({ data, params, configs } = {}) =>
  axios('post', '/api/back/record/save', data, params, configs)

// 后台-报告更新
export const putReport = ({ data, params, configs } = {}) =>
  axios('post', '/api/back/record/update', data, params, configs)

// 后台-报告分页
export const getReportPage = ({ data, params, configs } = {}) =>
  axios('get', '/api/back/record/page', data, params, configs)

// 后台-报告详情
export const getRerportDetail = ({ data, params, configs } = {}) =>
  axios('get', '/api/back/record/info', data, params, configs)

// 后台-报告删除
export const delReport = ({ data, params, configs } = {}) =>
  axios('get', '/api/back/record/delete', data, params, configs)
