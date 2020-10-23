import request from '@/utils/request'

export function login(data) {
  console.log('访问登陆接口')
  return request({
    // url: '/vue-element-admin/user/login',
    url: 'apis/account/token_login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  console.log('根据jwt获取user信息')
  return request({
    url: 'apis/account/user_info',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/apis/account/token_logout',
    method: 'post'
  })
}
