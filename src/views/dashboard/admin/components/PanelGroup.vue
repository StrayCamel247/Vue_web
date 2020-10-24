<template>
  <el-row :gutter="40" class="panel-group">
    <KpiLabel
      v-for="(item,index) in kpiList"
      :key="index"
      class="kpiItem"
      :title="item.name"
      :kpi-loading="item.kpiLoading"
      :main-number="item.value"
      width="100%"
    />
    <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Messages
          </div>
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Purchases
          </div>
          <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Shoppings
          </div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col> -->
  </el-row>
</template>

<script>
import KpiLabel from './children/kpi_label'
import { getIndicator, getKpiValue } from '@/api/dashboard/PanelGroup'
// import { mapActions } from 'vuex'
export default {
  components: {
    // eslint-disable-next-line no-undef
    KpiLabel
    // ,
    // CountTo
  },
  data() {
    return {
      kpiTitle: '',
      kpiList: [],
      searchData: {},
      mid_class: []
    }
  },
  created() {
    this.getKpiData()
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    // 请求查询KPI接口
    getKpiData() {
      this.kpiLoading = true
      // this.getKpis().then(res => {
      //   this.kpiList = JSON.parse(JSON.stringify(res.content))
      // })
      // let obj = JSON.parse(JSON.stringify())
      getIndicator().then(res => {
        // this.kpiLoading = false
        this.kpiTitle = res.content.title
        console.log(this.kpiTitle)
        this.kpiList = JSON.parse(JSON.stringify(res.content.option))
        for (const i in this.kpiList) {
          this.kpiList[i].kpiLoading = true
          // let obj = JSON.parse(JSON.stringify())
          // obj.indicator = this.kpiList[i].key
          const obj = this.kpiList[i].key
          this.setKpiValue(obj, i)
        }
      })
    },
    setKpiValue(obj, i) {
      getKpiValue({ indicator: obj }).then(res => {
        this.kpiList[i].kpiLoading = false
        this.kpiList[i].value = res && res.content ? res.content : ''
        // this.$forceUpdate()
        console.log(this.kpiList)
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
