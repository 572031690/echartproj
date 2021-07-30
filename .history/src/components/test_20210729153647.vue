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
        ],
        seriesOptions: [
          {
            barWidth: '30%', // 宽度
            itemStyle: {
              color: arg => {
                // 设置柱的颜色
                console.log(arg)
                return barChart.colorArr[arg.dataIndex]
              }
            },
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 16
              },
              padding: [0, 0, 10, 0]
            }
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
              formatter: '{b}',
              offset: [-76, 20],
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
              formatter: '{b}',
              offset: [70, 20],
              textStyle: {
                color: '#eee'
              }
            },
            type: 'bar',
            barGap: 0,
            itemStyle: {
              normal: {
                color: 'rgba(40,191,126, 0)'
              }
            },
            xAxisIndex: 1,
            yAxisIndex: 1
          }
        ],
        grid: {
          top: 130,
          bottom: 101
        },
        chartOptions: {
          title: {
            text: '基础柱状图分组',
            top: 30,
            left: 10,
            textStyle: {
              color: '#fff',
              fontSize: 22
            }
          },
          xAxis: [
            {
              type: 'category',
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
              // zlevel: 2
            },
            {
              type: 'category',
              gridIndex: 1,
              axisLine: {
                show: false
              },
              axisTick: {}
            }
          ],
          yAxis: [
            {
              name: '企业营收（万元）',
              nameLocation: 'top',
              nameTextStyle: {
                color: '#fff',
                padding: [0, 8, 170, 0],
                fontSize: 15
              },
              type: 'value',
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
                // 去除网格线
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    initChart() {
      const chartInstance = this.$echarts.init(this.$refs.mybar)
      const data = {
        xData: ['类别1', '类别2', '类别3', '类别4', '类别5', '类别6'],
        yData: [100, 120, 140, 90, 90, 80],
        colorArr: [
          '#33ccff',
          '#33ccff',
          '#33ccff',
          '#3366cc',
          '#3366cc',
          '#3366cc'
        ]
      }
      const option = {
        legend: {},
        tooltip: {
          formatter: function(res) {
            return res.data.name
          }
        },
        visualMap: { // 区间内控制显示颜色
          top: 10,
          right: 10,
          show: true,
          dimension: 1,
          pieces: [{ min: parseFloat(0.8), max: parseFloat(0.9), color: 'green' }],
          outOfRange: {
            symbol: 'rect',
            symbolSize: [10, 10],
            color: 'red'
          }
        },
        xAxis: {
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          axisTick: { // 坐标轴刻度
            alignWithLabel: true, // 对其刻度线
            interval: 0
          }
        },
        yAxis: {},
        series: [
          {
            type: 'line',
            data: [
              {
                name: '黄色点',
                value: 0.76,
                visualMap: false,
                symbol: 'rect',
                symbolSize: [10, 10],
                itemStyle: {
                  normal: {
                    color: 'gold'
                  }
                }
              },
              0.78,
              0.68,
              0.84,
              0.84,
              0.9,
              0.7,
              0.73,
              0.75,
              0.8
            ],
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: function(pam) {
                  return pam.data[1]
                },
                color: 'blue',
                fontSize: 8
              }
            }

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
  background: #000;
}
</style>
