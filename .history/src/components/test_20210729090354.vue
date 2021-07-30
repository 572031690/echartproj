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
    console.log('sssssssssssssss')
  },
  data () {
    return {
      chartInstance: null,
      xData: ['类别1', '类别2', '类别3'],
      yData: [100, 120, 140],
      yDatas: [90, 90, 80],
      xDatas: ['类别4', '类别5', '类别6']
    }
  },
  methods: {
    initChart() {
      const chartInstance = this.$echarts.init(this.$refs.mybar)
      const initOption = {
        xAxis: {
          type: 'category',
          // boundaryGap: false, // 数据起点于x轴不需要间隙
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
  border: 1px solid black;
  position: absolute;
}
</style>
