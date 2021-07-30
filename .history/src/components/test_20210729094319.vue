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
      const option = {
        xAxis: [
          {
            type: 'category',
            data: [
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
              'Sun',
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
              'Sun'
            ],
            axisTick: {
              length: 20
            }
          },
          {
            type: 'category',
            data: [
              {
                value: 'First week',
                textStyle: {
                  fontSize: 18,
                  lineHeight: 70
                }
              },
              {
                value: 'Second weeks',
                textStyle: {
                  fontSize: 18,
                  lineHeight: 70
                }
              }
            ],
            position: 'bottom',
            axisTick: {
            }
          }
        ],
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              220,
              332,
              301,
              334,
              690,
              730,
              720,
              220,
              332,
              301,
              334,
              690,
              730,
              720
            ],
            type: 'bar'
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
