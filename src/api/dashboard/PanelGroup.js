import request from '@/utils/request'

export function getIndicator() {
  return request({
    url: '/apis/dashboard/indicator',
    method: 'get',
    params: {}
  })
}

export function getKpiValue(data) {
  return request({
    url: '/apis/dashboard/kpi_value',
    method: 'post',
    data
  })
}

export function getDashboardBarChartDataApis(data) {
  return request({
    url: '/apis/dashboard/barChart',
    method: 'post',
    data
  })
}
