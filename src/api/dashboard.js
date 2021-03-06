import request from '@/utils/request'
export function transactionList(page) {
  return request({
    url: '/apis/dashboard/TransactionTable',
    method: 'get',
    params: { page }
  })
}

export function getIndicator() {
  return request({
    url: '/apis/dashboard/indicator',
    method: 'get',
    params: {}
  })
}

export function getKpiValue(data) {
  return request({
    url: '/apis/dashboard/kpi-value',
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

export function getDashboardlineChartDataApis(data) {
  return request({
    url: '/apis/dashboard/LineChart',
    method: 'post',
    data
  })
}

export function getDashboardPieChartDataApis(data) {
  return request({
    url: '/apis/dashboard/PieChart',
    method: 'post',
    data
  })
}
