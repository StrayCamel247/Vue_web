import request from '@/utils/request'

export function fetchstock(query) {
  return request({
    url: '/apis/rqa/holding-stock',
    method: 'get',
    params: query
  })
}
export function updatastock(data) {
  return request({
    url: '/apis/rqa/modify-holding-stock',
    method: 'put',
    data
  })
}

export function delstock(data) {
  return request({
    url: '/apis/rqa/del-holding-stock',
    method: 'delete',
    data
  })
}
