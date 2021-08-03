<template>
  <div class="line-chart" ref="mybar">
    123
  </div>
</template>

<script>
export default {
  mounted() {
    this.getData()
    this.initChart()
  },
  data() {
    return {
      chartInstance: null,
      seriesData: [100, 120, 140, 90, 90, 80],
      barChart: {
        xAxisData: ['类别1', '类别2', '类别3', '类别4', '类别5', '类别6'],
        dataList: []
      }
    }
  },
  methods: {
    initChart() {
      const chartInstance = this.$echarts.init(this.$refs.mybar)
      const option = {
        grid: [
          {
            top: 130,
            bottom: 101
          }
        ],
        xAxis: [
          {
            type: 'value',
            // gridIndex: 0,
            axisLabel: {
              // 刻度标签文字的颜色
              show: true
            },
            splitLine: {
              show: false
              // x轴横线

            },
            axisLine: {
              // 设置轴线
              show: true
            },
            axisTick: {
              show: false // 是否显示坐标轴刻度。
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: this.barChart.xAxisData,
            // gridIndex: 0, // x 轴所在的 grid 的索引，默认位于第一个 grid。
            axisLabel: {
              color: '#fff' // 刻度标签文字的颜色
            },
            axisLine: {
              // 设置轴线
              show: false
            },
            axisTick: {
              show: false // 是否显示坐标轴刻度。
            }
          }
        ],
        series: [
          {
            stack: '类1',
            barWidth: '30%', // 宽度
            itemStyle: {
              color: '#3366cc'
            },
            data: this.barChart.dataList[1],
            type: 'bar'
          },
          {
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 16
              },
              formatter: arg => {
                console.log(arg)
                return this.seriesData[arg.dataIndex]
              }
            },
            stack: '类1',
            xAxisIndex: 0,
            barWidth: '30%', // 宽度
            itemStyle: {
              color: '#33ccff'
            },
            data: this.barChart.dataList[0],
            type: 'bar'
          }
        ]
      }
      chartInstance.setOption(option)
    },
    getData() {
      let sum = 0
      this.seriesData.forEach(item => (sum += item))
      const aver = sum / this.seriesData.length
      // console.log(aver)
      this.barChart.dataList[0] = this.seriesData.map(item => {
        if (item > aver) return item - aver
        else return 0
      })
      this.barChart.dataList[1] = this.seriesData.map(item => {
        if (item > aver) return aver
        else return item
      })
      console.log(this.barChart.dataList)
    }
  }
}
</script>

<style>
.line-chart {
  width: 800px;
  height: 500px;
  border: 1px solid black;
  background: #000;
}
</style>
