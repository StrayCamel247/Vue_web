<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

import { getDashboardlineChartDataApis } from '@/api/dashboard'
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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
    // ,
    // chartData: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {
      chart: null,
      lineChartData: [
        {
          code: 'expected',
          name: 'expected',
          data: [100, 120, 161, 134, 105, 160, 165],
          normal: { color: '#FF005A' },
          areaStyle: { color: '#f3f8ff' },
          animationEasing: 'cubicInOut'
        },
        {
          code: 'actual',
          name: 'actual',
          data: [120, 82, 91, 154, 162, 140, 145],
          normal: { color: '#3888fa' },
          areaStyle: { color: '#f3f8ff' },
          animationEasing: 'quadraticOut'
        }
      ],
      xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [],
      legendData: []
    }
  },
  // watch: {
  //   chartData: {
  //     deep: true,
  //     handler(lineChartData) {
  //       this.setOptions(lineChartData)
  //     }
  //   }
  // },
  mounted() {
    this.$nextTick(() => {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions()
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
    setOptions() {
      getDashboardlineChartDataApis().then((res) => {
        this.xAxisData =
          res && res.content && res.content.xAxis_data
            ? res.content.xAxis_data
            : this.xAxisData
        this.lineChartData =
          res && res.content && res.content.lineChart_data
            ? res.content.lineChart_data
            : this.lineChartData
        for (const i in this.lineChartData) {
          this.legendData.push(this.lineChartData[i].name)
          this.series.push({
            name: this.lineChartData[i].name,
            itemStyle: {
              normal: {
                color: this.lineChartData[i].normal.color,
                lineStyle: {
                  color: this.lineChartData[i].normal.color,
                  width: 2
                }
                // ,
                // areaStyle: {
                //   color: this.lineChartData[i].areaStyle.color
                // }
              }
            },
            smooth: true,
            type: 'line',
            data: this.lineChartData[i].data,
            animationDuration: 2800,
            animationEasing: this.lineChartData[i].animationEasing
          })
        }
        this.initChart()
      })
    },
    initChart() {
      this.chart.setOption({
        xAxis: {
          data: this.xAxisData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: this.legendData
        },
        series: this.series
      })
    }
  }
}
</script>
