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
        xAxisData: ['类别1', '类别2', '类别3', '类别4'],
        dataList: []
      },

      chartData1: [
        { rank: 1, name: '浙江省', value: 100 },
        { rank: 1, name: '江苏省', value: 90 },
        { rank: 1, name: '北京市', value: 89 },
        { rank: 1, name: '上海市', value: 60 }
      ],
      chartData2: [
        { rank: 2, name: '浙江省', value: 95 },
        { rank: 2, name: '江苏省', value: 84 },
        { rank: 2, name: '北京市', value: 82 },
        { rank: 2, name: '上海市', value: 75 }

      ],
      chartData3: [
        { rank: 3, name: '浙江省', value: 95 },
        { rank: 3, name: '江苏省', value: 84 },
        { rank: 3, name: '北京市', value: 52 },
        { rank: 3, name: '上海市', value: 75 }

      ],
      chartData4: [
        { rank: 4, name: '浙江省', value: 95 },
        { rank: 4, name: '江苏省', value: 74 },
        { rank: 4, name: '北京市', value: 82 },
        { rank: 4, name: '上海市', value: 65 }

      ],
      chartData5: [
        { rank: 5, name: '浙江省', value: 85.5 },
        { rank: 5, name: '江苏省', value: 44 },
        { rank: 5, name: '北京市', value: 72 },
        { rank: 5, name: '上海市', value: 75 }

      ],
      yAxisData: ['集成电路产业链', '集成电路制造', '集成电路制造', '集成电路制造']
    }
  },
  methods: {
    initChart() {
      const colorArr1 = [
        'rgba(11, 168, 44)',
        'rgba(44, 110, 255)',
        'rgba(22, 242, 217)',
        'rgba(254, 33, 30)',
        'rgba(250, 105, 0)'
      ]
      const ChartsData = [
        {
          name: '第一列',
          data: this.chartData1
        },
        {
          name: '第一列',
          data: this.chartData2
        },
        {
          name: '第一列',
          data: this.chartData3
        },
        {
          name: '第一列',
          data: this.chartData4
        },
        {
          name: '第一列',
          data: this.chartData5
        }
      ]
      var serises = ChartsData.map((item, index) => {
        if (item.data[index]) {
          return {
            name: item.data[index].name,
            stack: '类1',
            barWidth: '15%', // 宽度
            itemStyle: {
              color: arg => {
                return colorArr1[arg.componentIndex]
              },
              emphasis: { // 鼠标悬浮后的样式变化
                borderWidth: 5,
                borderType: 'solid',
                color: colorArr1[index],
                borderColor: colorArr1[index]
              }
            },
            data: [item.data[0].value, item.data[1].value, item.data[2].value, item.data[3].value],
            type: 'bar',
            label: {
              show: true,
              position: [5, 25],
              textStyle: {
                color: '#eee',
                fontSize: 12
              },
              fontWeight: 100, // 设置下面文字粗细
              formatter: arg => {
                return arg.seriesIndex + 1 + '' + item.data[index].name
              }
            }
          }
        }
      })
      // console.log(serises)
      const chartInstance = this.$echarts.init(this.$refs.mybar)
      const option = {
        tooltip: { // 设置鼠标悬浮提示框
          position: 'top',
          formatter: arg => {
            console.log(arg, '1111111111')
            return arg.seriesName + ' ' + arg.value
          },
          backgroundColor: '#343c55',
          borderColor: '#3c455a'
        },
        grid: [
          {
            top: 80,
            bottom: 81
          }
        ],
        xAxis: [
          {
            type: 'value',
            // gridIndex: 0,
            axisLabel: {
              // 刻度标签文字
              show: false
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
              show: true, // 是否显示坐标轴刻度。
              inside: true, // 让坐标轴刻度朝内 默认是false朝外
              length: 5 // 坐标轴刻度线的长度。
            },
            interval: 10 // 强制设置坐标轴刻度间隔值
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: this.yAxisData,
            // gridIndex: 0, // x 轴所在的 grid 的索引，默认位于第一个 grid。
            axisLabel: {
              color: '#fff', // 刻度标签文字的颜色
              padding: [0, 0, 45, 0], // 设置轴文字上下偏移
              textStyle: {
                fontSize: 16
              }
            },
            offset: -120, // 设置x轴的偏移 -92是向上 但是得配合onZero: false,使用 不然负数不会生效
            axisLine: {
              onZero: false,
              // 设置轴线
              show: false
            },
            axisTick: {
              show: false // 是否显示坐标轴刻度。
            }
          }
        ],
        series: serises
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
      // console.log(this.barChart.dataList)
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
