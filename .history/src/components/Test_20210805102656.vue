<template>
  <div class="line-chart" ref="mybar">
    123
  </div>
</template>

<script>
export default {
  mounted() {
    this.getData();
    this.initChart();
  },
  data() {
    return {
      chartInstance: null,
      seriesData: [
        [100, 320],
        [150, 250],
        [150, 300],
        [350, 400]
      ],
      barChart: {
        xAxisData: ["类别1", "类别2", "类别3", "类别4"],
        dataList: []
      }
    };
  },
  methods: {
    initChart() {
      const chartInstance = this.$echarts.init(this.$refs.mybar);
      const option = {
        grid: [
          {
            top: 130,
            bottom: 101
          }
        ],
        yAxis: [
          {
            type: "category",
            data: this.barChart.xAxisData,
            // gridIndex: 0, // x 轴所在的 grid 的索引，默认位于第一个 grid。
            axisLabel: {
              color: "#fff" // 刻度标签文字的颜色
            },
            axisLine: {
              // 设置轴线
              lineStyle: {
                color: "#fff",
                type: "dashed"
              }
            },
            axisTick: {
              show: false // 是否显示坐标轴刻度。
            }
          }
        ],
        xAxis: [
          {
            interval: 50, // 强制设置坐标轴刻度间隔值
            // scale: true,
            type: "value",
            // gridIndex: 0,
            axisLabel: {
              // 刻度标签文字的颜色
              color: "#fff"
            },
            splitLine: {
              // x轴竖线
              lineStyle: {
                // color: "rgba(255, 255, 255, 45)"
                type: "dashed"
              }
            },
            axisLine: {
              // 设置轴线
              show: true,
              // 设置轴线
              lineStyle: {
                color: "#fff"
              }
            },
            axisTick: {
              show: false // 是否显示坐标轴刻度。
            }
          }
        ],
        series: [
          {
            stack: "类1",
            barWidth: "30%", // 宽度
            itemStyle: {
              // color: "#3366cc"
            },
            data: this.barChart.dataList[0],
            type: "bar"
          },
          {
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
                fontSize: 16
              },
              formatter: arg => {
                console.log(arg);
                return this.seriesData[arg.dataIndex];
              }
            },
            stack: "类1",
            xAxisIndex: 0,
            barWidth: "30%", // 宽度
            itemStyle: {
              color: "#33ccff"
            },
            data: this.barChart.dataList[1],
            type: "bar"
          }
        ]
      };
      chartInstance.setOption(option);
    },
    getData() {
      this.barChart.dataList[0] = this.seriesData.map(item => {
        return item[0];
      });
      this.barChart.dataList[1] = this.seriesData.map(item => {
        return item[1] - item[0];
      });
      console.log(this.barChart.dataList);
    }
  }
};
</script>

<style>
.line-chart {
  width: 800px;
  height: 500px;
  border: 1px solid black;
  background: #000;
}
</style>
