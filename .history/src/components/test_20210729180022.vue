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
      averList: [],
      dataList: [],
      seriesData: [100, 120, 140, 90, 90, 80],
      barChart: {
        xAxisData: ['类别1', '类别2', '类别3', '类别4', '类别5', '类别6'],
        seriesData: [100, 120, 140, 90, 90, 80],
        colorArr: [
          '#33ccff',
          '#33ccff',
          '#33ccff',
          '#3366cc',
          '#3366cc',
          '#3366cc'
        ]
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
            type: 'category',
            data: this.barChart.xAxisData,
            // gridIndex: 0, // x 轴所在的 grid 的索引，默认位于第一个 grid。
            axisLabel: {
              color: '#fff' // 刻度标签文字的颜色
            },
            axisLine: {
              // 设置轴线
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false // 是否显示坐标轴刻度。
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            // gridIndex: 0,
            axisLabel: {
              // 刻度标签文字的颜色
              color: '#fff'
            },
            splitLine: {
              // y轴横线
              lineStyle: {
                color: 'rgba(255, 255, 255, 45)'
              }
            },
            axisLine: {
              // 设置轴线
              show: false
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
            data: this.dataList[1],
            type: 'bar',
            markLine: {
              data: [
                {
                  type: 'max',
                  name: '平均线'
                }
              ],
              lineStyle: {
                type: 'dashed',
                color: '#fff'
              },
              symbol: ['none', 'none'], // 去除线段两端标记样式
              label: {
                show: true,
                color: '#fff',
                formatter: '平均值'
              }
            }
          },
          {
            label: {
              show: true,
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
            data: this.dataList[0],
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
      this.dataList[0] = this.seriesData.map(item => {
        if (item > aver) return item - aver
        else return 0
      })
      this.dataList[1] = this.seriesData.map(item => {
        if (item > aver) return aver
        else return item
      })
      console.log(this.dataList)
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
