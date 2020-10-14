import request from '@/utils/request'

export function login(data) {
  console.log('访问登陆接口')
  return request({
    // url: '/vue-element-admin/user/login',
    url: 'apis/account/token-login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'apis/account/user_info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
