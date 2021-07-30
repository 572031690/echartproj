<template>
  <div class="line-chart" ref="mybar">
    123
  </div>
</template>

<script>
export default {
  mounted() {
    this.initChart()
    // this.getData()
    console.log('sssssssssssssss')
  },
  data() {
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
      const data = {
        xData: [
          '类别1',
          '类别2',
          '类别3',
          '类别4',
          '类别5',
          '类别6'

        ],
        yData: [100, 120, 140, 90, 90, 80],
        colorArr: ['#33ccff', '#33ccff', '#33ccff', '#3366cc', '#3366cc', '#3366cc']
      }
      const option = {
        title: {
          text: '基础柱状图分组',
          top: 30,
          left: 10,
          textStyle: {
            color: '#fff',
            fontSize: 22
          }
        },
        grid: [
          {
            top: 120,
            bottom: 101
          },
          {
            height: 60,
            bottom: 40
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: data.xData,
            gridIndex: 0, // x 轴所在的 grid 的索引，默认位于第一个 grid。
            axisLabel: {
              color: '#fff' // 刻度标签文字的颜色
            },
            axisLine: { // 设置轴线
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false // 是否显示坐标轴刻度。
            },
            zlevel: 2
          },
          {
            type: 'category',
            gridIndex: 1,
            axisLine: {
              show: false
            },
            axisTick: {
              length: 60
            },
            zlevel: 1
          }
        ],
        yAxis: [
          {
            type: 'value',
            gridIndex: 0,
            axisLabel: { // 刻度标签文字的颜色
              color: '#fff'
            },
            splitLine: { // y轴横线
              lineStyle: {
                type: 'solid'
              }
            },
            axisLine: { // 设置轴线
              show: false
            }
          },
          {
            type: 'value',
            gridIndex: 1,
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: { // 去除网格线
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            barGap: '50%',
            barCategoryGap: '80%',
            barWidth: '30%', // 宽度
            itemStyle: {
              color: arg => { // 设置柱的颜色
                console.log(arg)
                return data.colorArr[arg.dataIndex]
              }
            },
            data: data.yData,
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 16
              },
              padding: [0, 0, 10, 0]
            },
            xAxisIndex: 0,
            yAxisIndex: 0
          },
          {
            data: [
              {
                name: '分组1',
                value: 1
              }
            ],
            label: {
              show: true,
              position: 'inside',
              formatter: '{b}',
              offset: [-63, 20],
              textStyle: {
                color: '#eee'
              }
            },
            type: 'bar',
            barGap: 0,
            barWidth: '27.2727%',
            itemStyle: {
              normal: {
                color: 'rgba(134,176,237, 0)'
                // borderColor: '#000',
                // borderWidth: 0.5
              }
            },
            xAxisIndex: 1,
            yAxisIndex: 1
          },
          {
            data: [
              {
                name: '分组2',
                value: 1
              }
            ],
            label: {
              show: true,
              position: 'inside',
              formatter: '{b}',
              offset: [45, 20],
              textStyle: {
                color: '#eee'
              }
            },
            type: 'bar',
            barGap: 0,
            barWidth: '18.1818%',
            itemStyle: {
              normal: {
                color: 'rgba(40,191,126, 0)'
                // borderColor: '#000',
                // borderWidth: 0.5
              }
            },
            xAxisIndex: 1,
            yAxisIndex: 1
          }

        ]
      }
      chartInstance.setOption(option)
    }
  }
}
</script>

<style>
.line-chart {
  width: 800px;
  height: 500px;
  border: 1px solid black;
  position: absolute;
  background: #000;
}
</style>
