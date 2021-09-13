<template>
  <div id="gaodeMap">
    <div id="container"></div>
    <div  class="topTips">
      <div v-for="(item, index) in mapList" :key="index"   @click="goBackCIty(item,index)" :class="['topItem',{'current':currentIndex === index }]">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      hubeiCode: { name: '湖北省', code: '420000', center: { R: 112.724882, Q: 31.061028 } },
      currentIndex: 0,
      map: '',
      object3Dlayer: '',
      mapList: [],
      mapText: '',
      infoWindow: '',
      markerList: []
    }
  },
  created() {
    // key是申请的值
    var url =
      'https://webapi.amap.com/maps?v=1.4.15&key=992674179939d7e8de996eade9dd5bc2&plugin=Map3D,AMap.DistrictSearch&callback=onLoad'
    // 创建一个 script dom元素
    // doc需要补全document
    var jsapi = document.createElement('script')
    // 设定script标签属性
    jsapi.charset = 'utf-8'
    jsapi.src = url
    // 将API文件引入页面中,加载完毕以后会调用函数
    document.head.appendChild(jsapi)
  },
  mounted() {
    //   页面加载完,开始异步引入高德地图
    // 创建了一个回调函数,高德地图加载完毕会调用

    this.getMap()
  },
  methods: {
    // onLoad地图
    getMap() {
      var _this = this
      window.onLoad = function() { // 必须要放在window.onLoad内初始化
        _this.initMap()
      }
    },

    //  初始化 AMap
    initMap() {
      this.map = new AMap.Map('container', {
        mapStyle: 'amap://styles/6927c8a12becf56d0d5eb3fa83cf39b5', // 绑定地图样式风格
        viewMode: '3D',
        pitch: 60,
        zoom: 7.4, // 缩放大小
        center: [112.724882, 31.061028],
        showLabel: false, // 不显示地图文字标记
        // zoomEnable: false, // 地图是否可缩放，默认值为true。此属性可被setStatus/getStatus 方法控制
        keyboardEnable: false, // 地图是否可通过键盘控制
        dragEnable: true, // 地图是否可通过鼠标拖拽平移
        showIndoorMap: false // 关闭室内地图显示
      })
      this.map.on('complete', this.onMouse) // 地图加载完毕调用
      // 限制显示和拖拽的区域
      var bounds = this.map.getBounds()
      this.map.setLimitBounds(bounds)
      // 设置光照
      this.map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5)
      this.map.DirectionLight = new AMap.Lights.DirectionLight([0, 0, 1], [1, 1, 1], 1)

      this.object3Dlayer = new AMap.Object3DLayer()
      this.map.add(this.object3Dlayer)
      this.mapList = [this.hubeiCode]
      this.getCity(this.hubeiCode.code)
    },
    onMouse() {
      this.map.on('click', this.getMouse)
    },
    //   DistrictSearch方法search数据
    getCity(adcode) {
      // this.map.off('click', this.getMouse)
      // this.reload = true
      this.map.setZoom(7.5 + this.currentIndex) // 设置地图层级 7.4 8.4 9.4
      this.object3Dlayer.clear() // 清楚3D图
      this.map.clearMap() // 清楚文字 marker等
      this.markerList = []
      var _this = this
      new AMap.DistrictSearch({
        subdistrict: 1, // 返回下一级行政区
        extensions: 'all', // 返回行政区边界坐标组等具体信息
        level: 'city' // 查询行政级别为 市
      }).search(adcode, function(status, result) {
        // console.log(result.districtList[0], 'districtListdistrictList')
        const districtListFather = result.districtList[0]
        if (_this.currentIndex === 2) { _this.getText(districtListFather) }
        for (const i of districtListFather.districtList) {
          new AMap.DistrictSearch({
            subdistrict: 0, // 不返回下一级行政区
            extensions: 'all', // 返回行政区边界坐标组等具体信息
            level: 'city' // 查询行政级别为 市

          }).search(i.adcode, function(status, result) {
            _this.getPrismCity(result.districtList[0].boundaries, i)
            _this.getPrismWall(result.districtList[0].boundaries, i)

            if (_this.currentIndex === 0) { _this.getPrims(i) }
            if (_this.currentIndex !== 2) { _this.getText(i) }
            if (_this.currentIndex === 1) {
              // 创建 infoWindow 实例
              _this.infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(10, -50) })
              // 鼠标点击marker弹出自定义的信息窗体
              _this.getmarker(i.center, i.adcode, i.name)
            }
            // if (_this.currentIndex !== 2) {
            //   setTimeout(() => {
            //     _this.onMouse()
            //     _this.reload = false
            //   }, 1000)
            // }
          })
        }
      })
    },
    // 构建区域块
    getPrismCity(e, i) {
      const bounds = e
      const height = 60000
      const color = '#87bdfcff' // rgba #87bdfccc
      var prism = new AMap.Object3D.Prism({
        path: bounds,
        height: height,
        color: color
      })
      prism.name = i.name
      prism.center = i.center
      prism.adcodeYS = i.adcode
      prism.transparent = true
      this.object3Dlayer.add(prism)
    },
    // 构建区域分界线墙
    getPrismWall(e, i) {
      // *******立体墙的绘制******
      const bounds = e
      const height = 70000
      const color = '#0088ffff'// rgba
      var wall = new AMap.Object3D.Wall({
        path: bounds,
        height: height,
        color: color
      })
      wall.backOrFront = 'both'
      wall.transparent = true
      this.object3Dlayer.add(wall)
    },
    // 构建文本内容
    getText(e, height) {
      var _this = this
      // 生成顶部的文字
      _this.mapText = new AMap.Text({
        // text: result.districtList[0].name + '</br>(' + result.districtList[0].adcode + ')',
        text: e.name,
        verticalAlign: 'bottom',
        position: e.name === '黄冈市' ? [e.center.R + 0.8, e.center.Q] : [e.center.R, e.center.Q],
        height: height || 50000,
        style: {
          'background-color': 'transparent',
          // '-webkit-text-stroke': 'red',
          // '-webkit-text-stroke-width': '0.5px',
          'text-align': 'center',
          border: 'none',
          color: 'black',
          'font-size': '10px'
          // 'font-weight': 600
        }
      })
      _this.mapText.setMap(_this.map)
      // _this.$nextTick(() => {
      //   _this.reload = false
      // })
    },
    // 构建柱形
    getPrims(e) {
      // Prism方法生成立体的圆柱体
      var bounds = [
        new AMap.LngLat(e.center.R, e.center.Q),
        new AMap.LngLat(e.center.R + 0.1, e.center.Q),
        new AMap.LngLat(e.center.R + 0.1, e.center.Q - 0.1),
        new AMap.LngLat(e.center.R, e.center.Q - 0.1)
      ]
      if (e.adcode === '421100') {
        bounds = [
          new AMap.LngLat(e.center.R + 0.8, e.center.Q),
          new AMap.LngLat(e.center.R + 0.9, e.center.Q),
          new AMap.LngLat(e.center.R + 0.9, e.center.Q - 0.1),
          new AMap.LngLat(e.center.R + 0.8, e.center.Q - 0.1)
        ]
      }
      var height = 700000
      var color = '#eeeeee60'// rgba  #0088ff60
      var prism = new AMap.Object3D.Prism({
        path: bounds,
        height: height,
        color: color
      })
      this.object3Dlayer.add(prism)// 添加
      const dataValue = {
        center: e.center,
        name: height
      }
      this.getText(dataValue, height + 10000)
    },
    // 构建点图
    getmarker(value, adcode, name) {
      var marker = new AMap.Marker({
        position: new AMap.LngLat(value.R, value.Q), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        offset: new AMap.Pixel(0, -50), // 向上偏移
        icon: require('../assets/images/marker1.svg'),
        // content: content.join("<br>"),  //传入 dom 对象，或者 html 字符串,
        title: adcode
      })
      // 将创建的点标记添加到已有的地图实例：
      marker.code = adcode
      this.map.add(marker)
      this.markerList.push(marker)
      marker.content = `<div class="center" onclick="getDetail()">
                          ${name}
                        </div>`
      marker.on('click', this.markerClick)
      if (parseInt(marker.code) === 421081) { // 判断是不是石首市 如果是就打开窗口
        const openData = {}
        openData.target = marker
        this.markerClick(openData)
      }
    },
    markerClick(e) {
      this.markHighLight(e.target.code)
      // ********方法一: 用vue extend挂载  但是得配置vueconfig文件********
      // 提示：这里必须要保存一下this,在访问extend外部的内容时候需要：如 that.testOut
      // const that = this
      // const InfoContent = Vue.extend({
      //   template:  `<div class="center" v-on:click="getDetail()">
      //                 ${name}
      //               </div>`,
      //   data() {
      //     return {
      //       // testIner: "这是里面的内容",
      //     }
      //   },
      //   methods: {
      //     getDetail() {
      //       console.log(e.target.code)
      //       // console.log(that.testIner);
      //       that.getDetail()
      //     }
      //   }
      // })
      // const component = new InfoContent().$mount()
      // this.infoWindow.setContent(component.$el)

      // ********方法二: 用window监听********
      const infoWindowContent = e.target.content
      this.infoWindow.setContent(infoWindowContent)
      this.infoWindow.open(this.map, e.target.getPosition())
      // this.infoWindow.on('close', e => { // 关闭事件
      //   this.markerHighLight('');
      // });
      window.getDetail = () => {
        console.log('object：' + e.target.code)
      }
      // this.infoWindow.open(this.map, [117.00923, 36.675807]);
      // this.map.clearInfoWindow(); // 关闭窗体
    },
    // 散点高亮
    markHighLight(code) {
      this.markerList.forEach(marker => {
        if (marker.code === code) {
          marker.setIcon(require('../assets/images/marker2.svg'))
          marker.setOffset(new AMap.Pixel(0, -50))
          // this.createInfoWindow(marker)
        } else {
          marker.setIcon(require('../assets/images/marker1.svg'))
          marker.setOffset(new AMap.Pixel(0, -50))
        }
      })
    },
    // 点击弹窗详情
    getDetail() {
      console.log('object:')
    },
    // 鼠标事件
    getMouse(ev) {
      // var this = this
      debugger
      if (this.currentIndex === 2) return
      var pixel = ev.pixel
      var px = new AMap.Pixel(pixel.x, pixel.y)
      var obj = this.map.getObject3DByContainerPos(px, [this.object3Dlayer], false) || {}
      // 选中的 object3D 对象，这里为当前 Mesh
      // console.log(obj.object)
      if (!('name' in obj.object)) return
      // this.map.off('click', this.getMouse)
      var object = obj.object
      if (this.mapList.length < 3) {
        this.currentIndex++
        this.mapList.push({ name: object.name, code: object.adcodeYS, center: object.center })
      }
      const centerData = obj.object.center || 0
      if (centerData) this.map.setCenter([centerData.R, centerData.Q]) // 设置地图中心点

      this.getCity(object.adcodeYS)
    },
    // 导航栏点击事件
    goBackCIty(e, id) {
      if (this.currentIndex === id) return
      this.currentIndex = id
      if (!id) {
        this.mapList = [this.hubeiCode]
      } else {
        this.mapList.splice(id + 1, 1) // 删除导航栏一个数据
      }
      // this.map.clearMap()
      this.markerList = []
      this.map.setCenter([e.center.R, e.center.Q]) // 设置地图中心点
      this.getCity(e.code)
    }

  }
}
</script>

<style>
  #gaodeMap {
    width: 100%;
      height: 100vh;
  }
  #container {
    width: 100%;
    height: 100%;
  }
  .topTips {
    position: absolute;
    right:15% ;
    top: 15%;
    width: 15%;
    background-color: rgb(48, 133, 230);
  }
  .topItem {
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    background-color: rgb(183, 167, 196);
  }
  .current {
    background-color: rgb(68, 57, 77);

  }

   .amap-info-content {
     padding: 0px;
     width: 218.5px;
     height: 46.5px;
     border-radius: 2px;
     background-color: rgba(43, 78, 120, 1);
     box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.5);
     border: 1px solid rgba(29, 32, 49, 1);
  }
  .amap-info-sharp {
    border-top: 8px solid rgba(43, 78, 120, 1) !important;
  }
  .center {
    width: 140px;
    height: 46.5px;
    line-height: 46.5px;
    color: rgba(255, 255, 255, 100);
    padding-left: 25px;
    font-size: 14px;
    cursor: pointer;

  }
</style>
