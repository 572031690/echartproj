<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="com-container">
      <!-- 地区销售排行榜 -->
    <div class="com-chart" ref="stock_ref"></div>
  </div>
</template>

<script>
import stock from '../assets/stock'
import stocklist from '../assets/stock'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      currentIndex: 0,
      timeId: null
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    // 在页面加载完成的时候, 主动进行屏幕的适配
    this.screenAdapter()
  },
  destroyed () {
    // 在组件销毁的时候, 需要将监听器取消掉
    window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.timeId)
  },
  methods: {
    // 初始化echartInstance对象
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.stock_ref, this.theme)
      // 对图表初始化配置的控制
      const initOption = {
        title: {
          text: '| 库存和销量分析',
          left: 20,
          top: 20
        }
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timeId)
      })

      this.chartInstance.on('mouseout', () => {
        this.startInterval() 
      })

    },
    // 获取服务器的数据
    async getData () {
        // const {data: ret} = await this.$http.get('rank')
        // this.allData = ret
        // const stock = stocklist
      // setTimeout( stock =>{ 
        this.allData = stocklist
      // },100)
      console.log(this.allData,'ss');
      this.updateChart()
      this.startInterval()
    },
    // 更新图表
    updateChart () {
      // 圆饼坐标轴位置
      const centerArr = [
        ['18%','40%'],
        ['50%','40%'],
        ['82%','40%'],
        ['34%','75%'],
        ['66%','75%'],

      ]
      //颜色渐变数据
      const colorArr = [
        ['#4FF778', '#0BA82C'],
        ['#E5DD45', '#E8B11C'],
        ['#E8821C', '#E55445'],
        ['#5052EE', '#AB6EE5'],
        ['#23E5E5', '#2E72BF']
      ]
      let start = this.currentIndex * 5
      let end = (this.currentIndex + 1) * 5
        //处理数据
        const showData = this.allData.slice(start,end)
        const seriesArr = showData.map((item,index) => {
          return {
            type: 'pie',
            // radius: [110, 100],
            center: centerArr[index],
            //去除鼠标移入动画效果
            hoverAnimation: false,
            labelLine: {
              show: false //隐藏指示线
            },
            //设置下面的name到圆中心
            label:{
              position: 'center',
              color: colorArr[index][0]
            },
            data: [
              {
                name: item.name+ '\n'+ item.sales,
                value: item.sales,
                itemStyle: {
                  color:  new this.$echarts.graphic.LinearGradient(0, 1, 0, 0,[
                    {
                      offset: 0,
                      color: colorArr[index][0]
                    },
                    {
                      offset: 1,
                      color: colorArr[index][1]
                    }
                  ])
                }
              },
              {
                value: item.stock,
                itemStyle: {
                  color: '#333843'
                }
              }
            ]
          }
        })
      const dataOption = {
         series: seriesArr 
      }
      this.chartInstance.setOption(dataOption)
    },
    // 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
    screenAdapter () {
      // 和分辨率大小相关的配置项
      const titleFontSize = this.$refs.stock_ref.offsetWidth / 100 * 3.6
      const innerRadius = titleFontSize * 2
      const outterRadius = innerRadius * 1.25
      const adapterOption = {
        title: {
          textStyle : {
            fontSize: titleFontSize
          }
        },
        series: [
          {
            //写这个pie是为了防止界面刚打开的时候马上调用screenAdapter出现没有定义图标类型的错误
            type: 'pie',
            label: {
              fontSize: titleFontSize / 2
            },
            radius: [outterRadius, innerRadius]
          },
          {
            type: 'pie',
            label: {
              fontSize: titleFontSize / 2
            },
            radius: [outterRadius, innerRadius]
          },
          {
            type: 'pie',
            label: {
              fontSize: titleFontSize / 2
            },
            radius: [outterRadius, innerRadius]
          },
          {
            type: 'pie',
            label: {
              fontSize: titleFontSize / 2
            },
            radius: [outterRadius, innerRadius]
          },
          {
            type: 'pie',
            label: {
              fontSize: titleFontSize / 2 
            },
            radius: [outterRadius, innerRadius]
          },
        ]
         
      }
      this.chartInstance.setOption(adapterOption)
      // 手动的调用图表对象的resize 才能产生效果
      this.chartInstance.resize()
    },
   startInterval() {
     if(this.timeId){
       clearInterval(this.timeId)
     }
     this.timeId = setInterval(() => {
       if(this.currentIndex === 1) {
         this.currentIndex = 0
       }else {
         this.currentIndex = 1
       }
        //更新数据
       this.updateChart()
     },4000)
   }
  },
  computed: {
    ...mapState(['theme'])
  },
  watch: {
    theme () {
    this.chartInstance.dispose()
    this.initChart() //重新以最新的主题初始化图表对象
    this.screenAdapter() //完成屏幕适配
    this.updateChart() //更新图表的展示 
    }
  }
}
</script>

<style lang="less" scoped>
</style>
