import request from '@/utils/request'

export function transactionList(page) {
  return request({
    url: '/apis/transaction/list',
    method: 'get',
    params: { page }
  })
}
