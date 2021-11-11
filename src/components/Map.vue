<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="com-container" @dblclick="revertMap">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import axios from 'axios'
// 点击省份中午转英文方法
import { getProvinceMapInfo } from '@/utils/map_utils'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['theme'])
  },
  watch: {
    theme () {
    //   console.log("主题切换了");
      this.chartInstance.dispose() // 销毁当前的图表格
      this.initChart() // 重新以最新的主题初始化图表对象
      this.updateChart() // 更新图表的展示
      this.screenAdapter() // 完成屏幕适配
    }
  },
  data() {
    return {
      mapData: {}, // 所获取的省份地图矢量数据缓存
      chartInstance: null,
      // 散点数据
      allData: [
        {
          name: '黄金用户',
          children: [
            {
              name: '武汉',
              value: [114.31, 30.52]
            },
            {
              name: '丹东',
              value: [124.37, 40.13]
            },
            {
              name: '张家口',
              value: [114.87, 40.82]
            },
            {
              name: '深圳',
              value: [114.07, 22.62]
            }
          ]
        },
        {
          name: '白金用户',
          children: [
            {
              name: '金华',
              value: [119.64, 29.12]
            },
            {
              name: '西安',
              value: [108.95, 34.27]
            }
          ]
        },
        {
          name: '砖石用户',
          children: [
            {
              name: '成都',
              value: [104.06, 30.67]
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    // 在页面加载完成的时候, 主动进行屏幕的适配
    this.screenAdapter()
  },
  destroyed() {
    // 在组件销毁的时候, 需要将监听器取消掉
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    // 初始化echartInstance对象
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, this.theme)
      const ret = await axios.get(
        'http://localhost:8999/static/map/china.json'
      ) // 获得地图数据
      // console.log(ret, '地图数据')
      this.$echarts.registerMap('china', ret.data) // 注册map数据
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: '商家分布',
          left: 20,
          top: 20
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          itemStyle: {
            // 设置地图样式
            areaColor: '#2E72BF',
            borderColor: '#333'
          }
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical' // 设置图例排列是竖直还是横排
        }
      }
      this.chartInstance.setOption(initOption)
      // 监听点击
      this.chartInstance.on('click', async (arg) => {
        //   console.log(arg)
        // 调用外部方法获取中文身份的拼音
        const provinceInfo = getProvinceMapInfo(arg.name)
        // 判断获取的地图数据是否已经缓存 如果不存在
        if (!this.mapData[provinceInfo.key]) {
          // 获取这个省份的地图矢量数据
          const ret = await axios.get(
            'http://localhost:8999' + provinceInfo.path
          )
          // 缓存数据
          this.mapData[provinceInfo.key] = ret.data
          // console.log(ret)
          this.$echarts.registerMap(provinceInfo.key, ret.data)
        }
        const changeOption = {
          geo: {
            map: provinceInfo.key
          }
        }
        this.chartInstance.setOption(changeOption)
      })
    },
    // 获取服务器的数据
    getData() {
      //   const {data: ret} = await this.$http.get('map')
      //   this.allData = ret
      this.updateChart()
    },
    // 更新图表
    updateChart() {
      // 散点图例的数据
      const legendArr = this.allData.map((item) => {
        return item.name
      })

      const seriesArr = this.allData.map((item) => {
        // return 的是一个类别下所有的散点数据
        // 如果想在地图上显示散点，我们还要配置一个coordinateSystem: geo 配置散点使用地图坐标系统
        return {
          type: 'effectScatter', // 定义类型为散点
          rippleEffect: {
            // 设置涟漪动画
            scale: 5, // 动画范围
            brushType: 'stroke' // 设置涟漪动画的波纹效果为空心效果
          },
          name: item.name, // 散点名字
          data: item.children, // 散点数据
          coordinateSystem: 'geo' // 配置散点使用地图坐标系统
        }
      })
      const dataOption = {
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },

    // 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
    screenAdapter() {
      // 和分辨率大小相关的配置项
      const titleFontSize = (this.$refs.map_ref.offsetWidth / 100) * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 2, // 设置图例间隔
          textStyle: {
            fontSize: titleFontSize / 2
          }
        },
        series: {
          symbolSize: titleFontSize / 2.5
        }
      }
      this.chartInstance.setOption(adapterOption)
      // 手动的调用图表对象的resize 才能产生效果
      this.chartInstance.resize()
    },
    // 双击事件返回china
    revertMap() {
      const revertOption = {
        geo: {
          map: 'china'
        }
      }
      this.chartInstance.setOption(revertOption)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
