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
          '花溪区',
          '南明区',
          '观山湖区',
          '钟山区',
          '六枝特区',
          '红花岗区',
          '汇川区',
          '遵义县',
          '西秀区',
          '平坝县'
        ],
        yData: [0.1, 0.15, 0.18, 0.25, 0.23, 0.32, 0.33, 0.36, 0.57, 0.72]
      }
      const option = {
        tooltip: {},
        grid: [
          {
            top: 100,
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
            gridIndex: 0,
            axisLabel: {
              color: '#000'
            },
            axisLine: {
              lineStyle: {
                color: '#000'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#000'
              }
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
            axisLabel: {
              color: '#333'
            },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#ccc'
              }
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
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            data: data.yData,
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#000'
              }
            },
            xAxisIndex: 0,
            yAxisIndex: 0
          },
          {
            data: [
              {
                name: '贵阳市',
                value: 1
              }
            ],
            label: {
              show: true,
              position: 'inside',
              formatter: '{b}',
              offset: [0, 10],
              textStyle: {
                color: '#000'
              }
            },
            type: 'bar',
            barGap: 0,
            barWidth: '27.2727%',
            itemStyle: {
              normal: {
                color: 'rgba(134,176,237, 0)',
                borderColor: '#000',
                borderWidth: 0.5
              }
            },
            xAxisIndex: 1,
            yAxisIndex: 1
          },
          {
            data: [
              {
                name: '六盘水市',
                value: 1
              }
            ],
            label: {
              show: true,
              position: 'inside',
              formatter: '{b}',
              offset: [0, 10],
              textStyle: {
                color: '#000'
              }
            },
            type: 'bar',
            barGap: 8',
            barWidth: '18.1818%',
            itemStyle: {
              normal: {
                color: 'rgba(40,191,126, 0)',
                borderColor: '#000',
                borderWidth: 0.5
              }
            },
            xAxisIndex: 1,
            yAxisIndex: 1
          },
          {
            data: [
              {
                name: '遵义市',
                value: 1
              }
            ],
            label: {
              show: true,
              position: 'inside',
              formatter: '{b}',
              offset: [0, 10],
              textStyle: {
                color: '#000'
              }
            },
            type: 'bar',
            barGap: 0,
            barWidth: '27.2727%',
            itemStyle: {
              normal: {
                color: 'rgba(237,124,47, 0)',
                borderColor: '#000',
                borderWidth: 0.5
              }
            },
            xAxisIndex: 1,
            yAxisIndex: 1
          },
          {
            data: [
              {
                name: '安顺市',
                value: 1
              }
            ],
            label: {
              show: true,
              position: 'inside',
              formatter: '{b}',
              offset: [0, 10],
              textStyle: {
                color: '#000'
              }
            },
            type: 'bar',
            barGap: 0,
            barWidth: '18.1818%',
            itemStyle: {
              normal: {
                show: false,
                color: 'rgba(242,169,59, 0)',
                borderColor: '#000',
                borderWidth: 0.5
              }
            },
            xAxisIndex: 1,
            yAxisIndex: 1
          },
          {
            data: [
              {
                name: '铜仁市',
                value: 1
              }
            ],
            label: {
              show: true,
              position: 'inside',
              formatter: '{b}',
              offset: [0, 10],
              textStyle: {
                color: '#000'
              }
            },
            type: 'bar',
            barCategoryGap: 0,
            barGap: 0,
            barWidth: '9.0909%',
            itemStyle: {
              normal: {
                color: 'rgba(249,207,54, 0',
                borderColor: '#000',
                borderWidth: 0.5
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
  width: 500px;
  height: 500px;
  border: 1px solid black;
  position: absolute;
}
</style>
