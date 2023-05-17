import instance from '@/utils/axios'

export const axios = (method, url, data, params, configs) => {
  return instance({
    url,
    method,
    data,
    params,
    ...configs
  })
}

// 后台-报告分页
export const getReportList = ({ data, params, configs } = {}) =>
  axios('get', '/api/back/record/page', data, params, configs)
