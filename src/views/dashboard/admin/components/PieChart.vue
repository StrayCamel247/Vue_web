<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

import { getDashboardPieChartDataApis } from '@/api/dashboard'
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
      lineChartData: [
        { value: 320, name: 'Industries' },
        { value: 240, name: 'Technology' },
        { value: 149, name: 'Forex' },
        { value: 100, name: 'Gold' },
        { value: 59, name: 'Forecasts' }
      ],
      legendData: [],
      series: {
        name: 'WEEKLY WRITE ARTICLES',
        type: 'pie',
        roseType: 'radius',
        radius: [15, 95],
        center: ['50%', '38%'],
        data: [],
        animationEasing: 'cubicInOut',
        animationDuration: 2600
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getPieChartData()
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
    getPieChartData() {
      getDashboardPieChartDataApis().then((res) => {
        this.lineChartData =
          res && res.content && res.content.linechart_data
            ? res.content.linechart_data
            : this.lineChartData
        for (const i in this.lineChartData) {
          this.legendData.push(this.lineChartData[i].name)
          this.series.data.push({
            name: this.lineChartData[i].name,
            value: this.lineChartData[i].value
          })
        }
        console.log(this.series)
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.legendData
        },
        series: this.series
      })
    }
  }
}
</script>
