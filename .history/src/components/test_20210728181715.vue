<template>
  <div class="line-chart" ref="mybar">
    123
  </div>
</template>

<script>
export default {
  mounted () {
    this.initChart()
    // this.getData()
  },
  data () {
    return {
      chartInstance: null,
      xData: ['m', 'v', 'd'],
      yData: [54, 15, 35]
    }
  },
  methods: {
    initChart() {
      const chartInstance = this.$echarts.init(this.$refs.mybar)
      const initOption = {
        xAxis: {
          type: 'category',
          boundaryGap: false, // 数据起点于x轴不需要间隙
          data: this.xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '表',
            type: 'bar',
            data: this.yData
          }
        ]
      }
      chartInstance.setOption(initOption)
    }
  }
}
</script>

<style>
.line-chart{
  width: 500px;
  height: 500px;
}
</style>
