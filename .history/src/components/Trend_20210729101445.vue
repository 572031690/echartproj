<template>
  <div class="com-container">
    <div class="title" :style="comStyle">
        <span>{{'▎ ' + showtitle}}</span>
        <span class="iconfont title-icon" :style="comStyle" @click="showChoice = !showChoice">&#xe6eb</span>
        <div class="select-con" v-show="showChoice" :style="marginStyle">
          <div class="select-item" :style="comStyle" v-for="item in selectType" :key="item.key" @click="handleSelect(item.key)">
              {{item.text}}
          </div>
        </div>
    </div>
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getThemeValue } from '@/utils/theme_utils'
export default {
  data() {
    return {
      chartInstance: null,
      allData: {
        map: {
          title: '地区销量趋势',
          base: 310,
          unit: '万',
          data: [
            {
              name: '上海',
              data: [
                '155.13',
                '154.65',
                '171.46',
                '164.38',
                '237.23',
                '300.65',
                '240.29',
                '232.07',
                '193.31',
                '136.70',
                '48.64',
                '90.20'
              ]
            },
            {
              name: '北京',
              data: [
                '86.25',
                '33.80',
                '145.58',
                '21.79',
                '176.09',
                '132.41',
                '291.05',
                '191.89',
                '151.54',
                '94.25',
                '141.75',
                '157.14'
              ]
            },
            {
              name: '深圳',
              data: [
                '143.94',
                '186.29',
                '183.64',
                '251.48',
                '195.48',
                '152.16',
                '52.47',
                '184.12',
                '203.79',
                '39.16',
                '56.37',
                '161.64'
              ]
            },
            {
              name: '广州',
              data: [
                '57.60',
                '77.61',
                '307.24',
                '165.05',
                '175.41',
                '276.88',
                '269.04',
                '296.11',
                '105.31',
                '283.39',
                '134.08',
                '265.38'
              ]
            },
            {
              name: '重庆',
              data: [
                '200.82',
                '215.56',
                '249.80',
                '222.67',
                '216.98',
                '60.12',
                '309.68',
                '273.35',
                '150.99',
                '251.97',
                '26.15',
                '186.99'
              ]
            }
          ]
        },
        seller: {
          title: '商家销量趋势',
          base: 120,
          unit: '万',
          data: [
            {
              name: '商家1',
              data: [
                '33.00',
                '86.07',
                '28.77',
                '34.29',
                '102.45',
                '0.30',
                '50.50',
                '21.70',
                '25.41',
                '25.71',
                '66.90',
                '63.29'
              ]
            },
            {
              name: '商家2',
              data: [
                '12.83',
                '102.42',
                '37.37',
                '95.55',
                '45.45',
                '112.72',
                '113.53',
                '106.41',
                '75.67',
                '113.91',
                '37.32',
                '28.04'
              ]
            },
            {
              name: '商家3',
              data: [
                '73.54',
                '40.92',
                '89.81',
                '113.41',
                '76.34',
                '107.15',
                '55.61',
                '0.33',
                '106.29',
                '78.30',
                '98.05',
                '38.67'
              ]
            },
            {
              name: '商家4',
              data: [
                '47.19',
                '73.57',
                '44.60',
                '84.03',
                '62.82',
                '15.65',
                '64.72',
                '88.98',
                '29.25',
                '5.41',
                '79.11',
                '118.46'
              ]
            },
            {
              name: '商家5',
              data: [
                '74.84',
                '116.45',
                '107.69',
                '11.03',
                '17.31',
                '42.22',
                '97.60',
                '108.64',
                '43.87',
                '110.65',
                '5.96',
                '38.41'
              ]
            }
          ]
        },
        commodity: {
          title: '商品销量趋势',
          base: 50,
          unit: '万',
          data: [
            {
              name: '女装',
              data: [
                '47.71',
                '13.34',
                '19.30',
                '7.93',
                '41.93',
                '23.01',
                '22.63',
                '26.91',
                '0.62',
                '39.23',
                '48.74',
                '29.48'
              ]
            },
            {
              name: '手机数码',
              data: [
                '46.66',
                '46.52',
                '23.65',
                '1.73',
                '44.26',
                '47.07',
                '17.86',
                '40.20',
                '3.78',
                '31.46',
                '28.01',
                '8.63'
              ]
            },
            {
              name: '男装',
              data: [
                '26.98',
                '30.71',
                '42.59',
                '29.50',
                '26.86',
                '17.65',
                '30.15',
                '15.85',
                '9.28',
                '30.20',
                '32.35',
                '34.46'
              ]
            },
            {
              name: '大家电',
              data: [
                '20.26',
                '46.23',
                '43.84',
                '46.75',
                '28.29',
                '32.36',
                '45.30',
                '16.73',
                '40.40',
                '45.07',
                '29.86',
                '41.92'
              ]
            },
            {
              name: '美妆护肤',
              data: [
                '7.58',
                '23.66',
                '39.78',
                '30.20',
                '25.72',
                '36.20',
                '47.55',
                '35.39',
                '27.85',
                '37.56',
                '16.91',
                '3.91'
              ]
            }
          ]
        },
        common: {
          month: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ]
        },
        type: [
          {
            key: 'map',
            text: '地区销量趋势'
          },
          {
            key: 'seller',
            text: '商家销量趋势'
          },
          {
            key: 'commodity',
            text: '商品销量趋势'
          }
        ]
      },
      showChoice: false, // 是否显示我们的可选项
      choiceType: 'map', // 显示数据的类型
      titleFontSize: 0 // 指明标题的字体大小
    }
  },
  mounted() {
    // setTimeout(() => {
    this.initChart()
    this.getData()
    // },1000)

    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
  computed: {
    selectType() {
      // 显示可选列表
      if (!this.allData) {
        return []
      } else {
        // 筛选数据，将选中的数据去除来不显示在下拉条
        return this.allData.type.filter((item) => {
          return item.key !== this.choiceType
        })
      }
    },
    showtitle() {
      // 显示选中的标题
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.choiceType].title
      }
    },
    // 设置给标题的样式
    comStyle() {
      return {
        fontSize: this.titleFontSize + 'px',
        color: getThemeValue(this.theme).titleColor,
        background: getThemeValue(this.theme).backgroundColor
      }
    },
    // 设置下拉框的左边间距
    marginStyle() {
      return {
        marginLeft: this.titleFontSize + 'px'
        // background: getThemeValue(this.theme).backgroundColor,
        // color: getThemeValue(this.theme).titleColor
      }
    },

    ...mapState(['theme'])
  },
  watch: {
    theme() {
      this.chartInstance.dispose()
      this.initChart() // 重新以最新的主题初始化图表对象
      this.screenAdapter() // 完成屏幕适配
      this.updateChart() // 更新图表的展示
    }
  },
  methods: {
    handleSelect(currentType) {
      this.choiceType = currentType
      this.updataCharts()
      this.showChoice = false
    },
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref, this.theme)
      const initOption = {
        grid: {
          // 设置坐标轴的位置 也就是修改图表大小
          top: '33%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true // 距离是包含坐标轴上的文字
        },
        tooltip: {
          // 工具提示 鼠标移入提示
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false // 数据起点于x轴不需要间隙
        },
        legend: {
          // 设置图例
          left: '20%',
          top: '15%',
          icon: 'circle' // 设置图例型状为圆形
        },
        yAxis: {
          type: 'value'
        }
      }
      this.chartInstance.setOption(initOption)
    },
    async getData() {
      // const {data: ret} = await this.$http.get('trend')
      // this.allData = ret
      console.log(this.allData)
      this.updateChart()
    },
    updateChart() {
      const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(44, 110, 255, 0.5)',
        'rgba(22, 242, 217, 0.5)',
        'rgba(254, 33, 30, 0.5)',
        'rgba(250, 105, 0, 0.5)'
      ]
      // 全透明的颜色值
      const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(44, 110, 255, 0)',
        'rgba(22, 242, 217, 0)',
        'rgba(254, 33, 30, 0)',
        'rgba(250, 105, 0, 0)'
      ]
      const timeArr = this.allData.common.month
      const valueArr = this.allData[this.choiceType].data
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name, // 对应name
          type: 'line',
          data: item.data,
          stack: this.choiceType, // 设置为相同的值的时候就会以堆叠图的形式呈现不会交错在一起
          areaStyle: {
            // 设置折现区域的颜色渐变
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                // 0%的颜色值
                offset: 0,
                color: colorArr1[index]
              },
              {
                // 100%颜色值
                offset: 1,
                color: colorArr2[index]
              }
            ])
          }
        }
      })
      const legendArr = valueArr.map((item) => {
        return item.name
      })
      const dataOption = {
        xAxis: {
          data: timeArr
        },
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.trend_ref.offsetWidth / 100) * 3.6
      const adapterOption = {
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize / 2, // 图例的间距
          textStyle: {
            // 设置图例文字样式
            fontSize: this.titleFontSize / 2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize() // 最后调用echarts大小适应
    }
  }
}
</script>

<style>
.title {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: aliceblue;
}
.title-icon {
  margin-left: 10px;
  cursor: pointer;
}
.select-item {
  cursor: pointer;
  background-color: #222733;
}
</style>
