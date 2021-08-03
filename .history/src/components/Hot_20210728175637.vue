<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="com-container">
      <!-- 地区销售排行榜 -->
    <div class="com-chart" ref="hot_ref"></div>
    <!-- @mouseenter="hoverFont()" @mouseleave="leaveFont()" ref="left" -->
    <span class="iconfont arr-left" @click="toLeft" :style="comStyle" >&#xe6ef</span>
    <span class="iconfont arr-right" @click="toRight" :style="comStyle" >&#xe6ed</span>
    <span class="cat-name" :style="comStyle">{{cattiName}}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getThemeValue } from '@/utils/theme_utils'
export default {
    computed: {
        cattiName(){
            if(!this.allData){
                return ''
            }else{
                return this.allData[this.currentIndex].name
            }
        },
        comStyle () {
          // console.log('Sssssssssssss')
          return {
            fontSize: this.titleFontSize + 'px',
            // '--font-size-hover': this.titleFontSize+this.titleFontSize / 5 +'px'
            color: getThemeValue(this.theme).titleColor
          }
        },
        ...mapState(['theme'])
    },
    watch: {
      theme() {
         console.log('主题切换了');
          this.chartInstance.dispose() //销毁当前的图表格
          this.initChart() //重新以最新的主题初始化图表对象
          this.screenAdapter() //完成屏幕适配
          this.updateChart() //更新图表的展示 
      }
    },
  data () {
    return {
      chartInstance: null,
      allData: [
  {
    "name": "女装",
    "children": [
      {
        "name": "裙装",
        "value": 56202,
        "children": [
          {
            "name": "套装裙",
            "value": 10281
          },
          {
            "name": "A字裙",
            "value": 22331
          },
          {
            "name": "复古连衣裙",
            "value": 23590
          }
        ]
      },
      {
        "name": "女士上衣",
        "value": 42013,
        "children": [
          {
            "name": "格子衬衫",
            "value": 7896
          },
          {
            "name": "雪纺衫",
            "value": 10422
          },
          {
            "name": "polo衫",
            "value": 23695
          }
        ]
      },
      {
        "name": "外套",
        "value": 210282,
        "children": [
          {
            "name": "牛仔外套",
            "value": 87330
          },
          {
            "name": "针织外套",
            "value": 65770
          },
          {
            "name": "风衣外套",
            "value": 57182
          }
        ]
      },
      {
        "name": "裤装",
        "value": 168203,
        "children": [
          {
            "name": "工装裤",
            "value": 68203
          },
          {
            "name": "阔腿裤",
            "value": 50000
          },
          {
            "name": "牛仔裤",
            "value": 50000
          }
        ]
      },
      {
        "name": "特色类目",
        "value": 40292,
        "children": [
          {
            "name": "大码女装",
            "value": 292
          },
          {
            "name": "旗袍",
            "value": 10000
          },
          {
            "name": "礼服",
            "value": 10000
          }
        ]
      },
      {
        "name": "童装",
        "value": 20313,
        "children": [
          {
            "name": "童衣",
            "value": 5000
          },
		  {
            "name": "童裤子",
            "value": 15313
          }
        ]
      }
    ]
  },
  {
    "name": "手机数码",
    "children": [
      {
        "name": "手机",
        "value": 201023,
        "children": [
          {
            "name": "拍照手机",
            "value": 1023
          },
          {
            "name": "游戏手机",
            "value": 40000
          },
          {
            "name": "全面屏手机",
            "value": 160000
          }
        ]
      },
      {
        "name": "手机配件",
        "value": 103735,
        "children": [
          {
            "name": "手机壳",
            "value": 3735
          },
          {
            "name": "手机贴膜",
            "value": 70000
          },
          {
            "name": "创意配件",
            "value": 30000
          }
        ]
      },
      {
        "name": "摄影摄像",
        "value": 83834,
        "children": [
          {
            "name": "单反相机",
            "value": 3834
          },
          {
            "name": "微单",
            "value": 50000
          },
          {
            "name": "镜头",
            "value": 30000
          }
        ]
      },
      {
        "name": "影音娱乐",
        "value": 68384,
        "children": [
          {
            "name": "耳机/耳麦",
            "value": 30000
          },
          {
            "name": "音箱/音响",
            "value": 8384
          },
          {
            "name": "麦克风",
            "value": 30000
          }
        ]
      },
      {
        "name": "数码配件",
        "value": 45038,
        "children": [
          {
            "name": "存储卡",
            "value": 10000
          },
          {
            "name": "三脚架/云台",
            "value": 5038
          },
          {
            "name": "机身附件",
            "value": 30000
          }
        ]
      },
      {
        "name": "智能设备",
        "value": 90382,
        "children": [
          {
            "name": "智能手环",
            "value": 382
          },
          {
            "name": "智能家居",
            "value": 60000
          },
          {
            "name": "无人机",
            "value": 30000
          }
        ]
      },
      {
        "name": "其他",
        "value": 10201,
        "children": [
          {
            "name": "运营商",
            "value": 10000
          },
          {
            "name": "电子教育",
            "value": 201
          }
        ]
      }
    ]
  },
  {
    "name": "美妆护肤",
    "children": [
      {
        "name": "面部护肤",
        "value": 430291,
        "children": [
          {
            "name": "乳液/面霜",
            "value": 30291
          },
          {
            "name": "洁面",
            "value": 100000
          },
          {
            "name": "面膜",
            "value": 300000
          }
        ]
      },
      {
        "name": "彩妆",
        "value": 80284,
        "children": [
          {
            "name": "口红",
            "value": 60284
          },
          {
            "name": "粉底液",
            "value": 10000
          },
          {
            "name": "眉笔/眉粉",
            "value": 10000
          }
        ]
      },
      {
        "name": "男士护肤",
        "value": 40294,
        "children": [
          {
            "name": "洁面",
            "value": 10294
          },
          {
            "name": "剃须",
            "value": 5000
          },
          {
            "name": "护肤套装",
            "value": 25000
          }
        ]
      },
      {
        "name": "美妆工具",
        "value": 50939,
        "children": [
          {
            "name": "化妆棉",
            "value": 10939
          },
          {
            "name": "化妆刷",
            "value": 10000
          },
          {
            "name": "双眼皮贴",
            "value": 30000
          }
        ]
      },
      {
        "name": "其他",
        "value": 10921,
        "children": [
          {
            "name": "香水",
            "value": 921
          },
          {
            "name": "当季主推",
            "value": 10000
          }
        ]
      }
    ]
  }
],
    currentIndex: 0,//当前所展示的一级分类数据
    titleFontSize: 0,
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
  },
  methods: {
    hoverFont(){
      // console.log(this.$refs.left.style.fontSize, 'das');
      this.$refs.left.style.fontSize = this.titleFontSize+this.titleFontSize / 5 +'px' 
    },
    leaveFont(){
      this.$refs.left.style.fontSize = this.titleFontSize +'px' 
    },
    // 初始化echartInstance对象
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref,this.theme)
      // 对图表初始化配置的控制
      const initOption = {
          title: {
                text: '| 热销商品的占比',
                top: 25,
                left: 25

            },
            //顶部图例设置
            legend: {
                top: '13%',
                icon: 'circle',
            },
            //设置鼠标触碰以后跳出的工具提示
            tooltip: {
                show: true,
                formatter: arg => {
                    let total = 0
                    let retStr = ''
                    // console.log(arg.data.children)
                    arg.data.children.forEach(element => {
                        total += element.value
                    });
                    arg.data.children.forEach(element => {
                        retStr += `${element.name}: ${parseInt(element.value / total * 100) + '%'}
                        <br/>`
                    });
                    // console.log(argname);
                    
                    return retStr 
                }
            },
          series: [
              {
                  type: 'pie',
                  //饼图旁边文字显示和消失
                  label: {
                      show: false
                  },
                  //设置高亮的显示内容
                  emphasis: {
                      label: {
                          show: true
                      },
                      labelLine: {
                          show: false
                      }
                  }
              }
          ]
      }
      this.chartInstance.setOption(initOption)

    },
    // 获取服务器的数据
    async getData () {
        // const {data: ret} = await this.$http.get('rank')
        // this.allData = ret
      this.updateChart()
    },
    // 更新图表
    updateChart () {
        //处理数据
        const seriesName = this.allData[this.currentIndex].children.map(item => {
            return item.name
        })
        const seriesData = this.allData[this.currentIndex].children.map(item => {
            return {
                name: item.name,
                value: item.value,
                children: item.children
            }
        })
        const dataOption = {
            //顶部事例
            legend:{
                data: seriesName
            },
            series: [
                {
                    data: seriesData
                }
            ]
      }
      this.chartInstance.setOption(dataOption)
    },
    // 当浏览器的大小发生变化的时候, 会调用的方法, 来完成屏幕的适配
    screenAdapter () {
      // 和分辨率大小相关的配置项
      this.titleFontSize = this.$refs.hot_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
         title: {
             textStyle: {
                 fontSize: this.titleFontSize
             },
             
         },
         legend: {
           itemWidth: this.titleFontSize,
           itemHeight: this.titleFontSize,
           itemGap: this.titleFontSize / 2,
           textStyle: {
             fontSize: this.titleFontSize / 2
           }
         },
         series: [
                 {
                     //设置半径
                     radius: this.titleFontSize * 5,
                     //设置圆的中心点
                     center: ['51%', '60%'] 
                 }
             ]
      }
      this.chartInstance.setOption(adapterOption)
      // 手动的调用图表对象的resize 才能产生效果
      this.chartInstance.resize()
    },
   toLeft(){

       this.currentIndex--
        if(this.currentIndex < 0) this.currentIndex = this.allData.length-1
    //    console.log(this.currentIndex)
       this.updateChart()
   },
   toRight(){
       this.currentIndex++
       if(this.currentIndex > this.allData.length - 1) {this.currentIndex = 0}
       this.updateChart()
   }
  }
}
</script>

<style lang="less" scoped>
.arr-right {
    position: absolute;
    right: 10%;
    top:50% ;
    color: aliceblue ;
    transform: rotate(360deg);
    cursor: pointer;
}

.arr-left {
    position: absolute;
    left: 10%;
    top:50% ;
    color: aliceblue ;
    transform: rotate(360deg);
    cursor: pointer;

}

.arr-left:hover {
  font-size: var(--font-size-hover);
}
.cat-name {
    position: absolute;
    color: white;
    bottom: 65px;
    right: 110px;
    font-weight: bold;
    font-size: 30px;
}


</style>
