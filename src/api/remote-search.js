import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

// export function transactionList(page) {
//   return request({
//     url: '/apis/transaction/list/',
//     method: 'get',
//     params: { page }
//   })
// }
