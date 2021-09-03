<template>
  <div id="gaodeMap">
    <div id="container"></div>
    <div  class="topTips">
      <div v-for="(item, index) in mapList" :key="index"   @click="goBackCIty(item,index)" :class="['topItem',{'current':currentIndex === index }]">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hubeiCode: { name: '湖北省', code: '420000' },
      currentIndex: 0,
      map: '',
      object3Dlayer: '',
      mapList: [],
      mapText: ''
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
    getMap() {
      var _this = this
      window.onLoad = function() {
        _this.initMap()

        // Prism方法生成立体的圆柱体
        var bounds = [
          new AMap.LngLat(110.840308, 32.404413),
          new AMap.LngLat(110.940308, 32.404413),
          new AMap.LngLat(110.940308, 32.504413),
          new AMap.LngLat(110.840308, 32.504413)
        ]
        var height = 700000
        var color = '#eeeeee60'// rgba  #0088ff60
        var prism1 = new AMap.Object3D.Prism({
          path: bounds,
          height: height,
          color: color
        })
        _this.object3Dlayer.add(prism1)// 添加

        // 生成顶部的数字
        var text = new AMap.Text({
        // text: result.districtList[0].name + '</br>(' + result.districtList[0].adcode + ')',
          text: '5400家',
          verticalAlign: 'bottom',
          position: [110.890308, 32.404413],
          height: 720000,
          style: {
            'background-color': 'transparent',
            // '-webkit-text-stroke': 'red',
            '-webkit-text-stroke-width': '0.5px',
            'text-align': 'center',
            border: 'none',
            color: 'white',
            'font-size': '16px',
            'font-weight': 600
          }
        })
        text.setMap(_this.map)

        _this.getMouse()
      }
    },
    getMouse() {
      // 鼠标拾取事件
      var _this = this
      this.map.on('click', function (ev) { // mousemove 鼠标移动 mouseover 鼠标覆盖 mouseout 鼠标离开
        var pixel = ev.pixel
        var px = new AMap.Pixel(pixel.x, pixel.y)
        var obj = _this.map.getObject3DByContainerPos(px, [_this.object3Dlayer], false) || {}
        // 选中的 object3D 对象，这里为当前 Mesh
        console.log(obj.object)
        if (obj.object) {
          var object = obj.object
          if (_this.mapList.length < 3) {
            _this.currentIndex++
            _this.mapList.push({ name: object.name, code: object.adcodeYS })
          }
          _this.getCity(object.adcodeYS)
        }
      })
    },
    initMap() {
      this.map = new AMap.Map('container', {
        mapStyle: 'amap://styles/6927c8a12becf56d0d5eb3fa83cf39b5',
        viewMode: '3D',
        pitch: 60,
        zoom: 7.5,
        center: [112.724882, 31.061028],
        showLabel: false, // 不显示地图文字标记
        // zoomEnable: false, // 地图是否可缩放，默认值为true。此属性可被setStatus/getStatus 方法控制
        keyboardEnable: false, // 地图是否可通过键盘控制
        dragEnable: true, // 地图是否可通过鼠标拖拽平移
        showIndoorMap: false // 关闭室内地图显示
      })
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
      this.map.clearMap()
    },
    getCity(adcode) {
      this.object3Dlayer.clear()
      var _this = this
      new AMap.DistrictSearch({
        subdistrict: 1, // 返回下一级行政区
        extensions: 'all', // 返回行政区边界坐标组等具体信息
        level: 'city' // 查询行政级别为 市

      }).search(adcode, function(status, result) {
        const districtList = result.districtList[0].districtList
        console.log(result.districtList[0], 'districtListdistrictList')
        for (const i of districtList) {
          new AMap.DistrictSearch({
            subdistrict: 0, // 返回下一级行政区
            extensions: 'all', // 返回行政区边界坐标组等具体信息
            level: 'city' // 查询行政级别为 市

          }).search(i.adcode, function(status, result) {
            let bounds = result.districtList[0].boundaries
            let height = 60000
            let color = '#87bdfcff' // rgba #87bdfccc
            var prism = new AMap.Object3D.Prism({
              path: bounds,
              height: height,
              color: color
            })
            prism.name = i.name
            prism.center = i.center
            prism.adcodeYS = i.adcode
            prism.transparent = true
            _this.object3Dlayer.add(prism)

            // *******立体墙的绘制******
            bounds = result.districtList[0].boundaries

            height = 70000
            color = '#0088ffff'// rgba
            var wall = new AMap.Object3D.Wall({
              path: bounds,
              height: height,
              color: color
            })
            wall.backOrFront = 'both'
            wall.transparent = true
            _this.object3Dlayer.add(wall)

            _this.getText(i.center, i.name)
          })
        }
      })
    },
    goBackCIty(e, id) {
      this.currentIndex = id
      if (!id) {
        this.mapList = [this.hubeiCode]
      } else {
        this.mapList.splice(id + 1, 1)
      }
      this.getCity(e.code)
    },
    getText(e, name) {
      var _this = this
      // 生成顶部的数字
      _this.mapText = new AMap.Text({
        // text: result.districtList[0].name + '</br>(' + result.districtList[0].adcode + ')',
        text: name,
        verticalAlign: 'bottom',
        position: name === '黄冈市' ? [e.R + 0.8, e.Q] : [e.R, e.Q],
        height: 60000,
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
      // _this.mapText.setMap(null)
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
</style>
