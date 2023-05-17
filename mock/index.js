import { apis } from '../src/service/api'

// const base = import.meta.env.VITE_APP_BASEURL

export default [
  {
    url: apis.getRoleList,
    method: 'get',
    response: () => {
      return {
        code: 0,
        'data|1-10': [
          {
            roleName: 'test',
            'roleId|+1': 1
          }
        ]
      }
    }
  }
]
