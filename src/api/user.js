import request from '@/utils/request'

export function login(data) {
  console.log('访问登陆接口')
  return request({
    // url: '/vue-element-admin/user/login',
    url: 'apis/account/token-login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  console.log('根据jwt获取user信息')
  return request({
    url: 'apis/account/user-info',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/apis/account/token-logout',
    method: 'post'
  })
}
