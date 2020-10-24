<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

import { getDashboardBarChartDataApis } from '@/api/dashboard/PanelGroup'
const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      seriesName: ['pageA', 'pageB', 'pageC'],
      seriesData: [
        [79, 52, 200, 334, 390, 330, 220, 79, 52, 200, 334, 390, 330, 220],
        [80, 52, 200, 334, 390, 330, 220, 80, 52, 200, 334, 390, 330, 220],
        [30, 52, 200, 334, 390, 330, 220, 30, 52, 200, 334, 390, 330, 220]
      ],
      series: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getBarChartData()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    // 请求查询KPI接口
    getBarChartData() {
      getDashboardBarChartDataApis().then((res) => {
        console.log('请求接口')
        // this.xAxisData = res.content.xAxis_data
        this.xAxisData =
          res && res.content && res.content.xAxis_data
            ? res.content.xAxis_data
            : this.xAxisData
        this.seriesData =
          res && res.content && res.content.series_data
            ? res.content.series_data
            : this.seriesData
        this.seriesName =
          res && res.content && res.content.series_name
            ? res.content.series_name
            : this.seriesName
        // this.seriesData = JSON.parse(JSON.stringify(res.content.series_data))
        // this.seriesName = JSON.parse(JSON.stringify(res.content.series_name))
        for (const i in this.seriesName) {
          this.series.push({
            name: this.seriesName[i],
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: this.seriesData[i],
            animationDuration
          })
        }
        console.log(this.series)
        this.initChart()
      })
    },
    initChart() {
      console.log('生成表格')
      console.log(this.series)
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            }
          }
        ],
        series: this.series
      })
    }
  }
}
</script>
