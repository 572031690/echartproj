<template>
  <div id="container"></div>

</template>

<script>
export default {
  data() {
    return {
      hubeiCode: '420000',
      cityCode: '',
      house: ''
    }
  },
  created() {
    // key是申请的值
    var url =
      'https://webapi.amap.com/maps?v=1.4.15&key=992674179939d7e8de996eade9dd5bc2&plugin=Map3D,AMap.DistrictSearch'
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
        // 所有关于地图的逻辑全部都要写在这个回调里面
        // 保证高德地图加载完毕
        var map = new AMap.Map('container', {
          zoom: 20, // 级别
          pitch: 60, // 地图俯仰角度，有效范围 0 度- 83 度
          zoom: 5, // 5.8
          showLabel: false, // 不显示地图文字标记
          zoomEnable: true, // 地图是否可缩放，默认值为true。此属性可被setStatus/getStatus 方法控制
          keyboardEnable: false, // 地图是否可通过键盘控制
          dragEnable: true, // 地图是否可通过鼠标拖拽平移
          center: [112.724882, 31.061028], // 中心点坐标
          viewMode: '3D' // 使用3D视图
        })

        const district = new AMap.DistrictSearch({
          subdistrict: 0,
          extensions: 'all',
          level: 'city' // 城市
        })
        district.search('深圳市', (status, result) => {
          const [bounds, mask] = [result.districtList[0].boundaries, []]
          if (bounds) {
            for (let i = 0, l = bounds.length; i < l; i++) {
            // 生成行政区划polygon
              const polygon = new AMap.Polygon({
                map: map,
                strokeWeight: 1,
                path: bounds[i],
                fillOpacity: 0.25,
                fillColor: '#09b8bf',
                strokeColor: '#09b8bf'
              })
              mask.push(polygon)
            }
          }
          map.add(mask)
          map.setFitView(mask) // 视口自适应
          AMap.plugin(['AMap.DistrictLayer'], function () {
            const disProvince = new AMap.DistrictLayer.Province({
              zIndex: 12,
              depth: 2,
              adcode: ['440306', '440307', '440308'], // 重点：添加要划分的子行政区码
              styles: {
                fill: function (properties) {
                  const adcode = properties.adcode
                  return getColorByAdcode(adcode)
                },
                'province-stroke': '#09b8bf',
                'city-stroke': '#09b8bf',
                'county-stroke': '#09b8bf' // 线条颜色
              }
            })
            disProvince.setMap(map)
          })
          // 随机颜色
          const getColorByAdcode = (adcode) => {
            const colors = {}
            if (!colors[adcode]) colors[adcode] = '#' + parseInt(0x1000000 * Math.random()).toString(16).padStart(6, '0')
            return colors[adcode]
          }
          map.on('click', () => {
            this.maps.infowindow.close()
          })
        })

        // 创建 geoJSON 实例
        var geoJson = new AMap.GeoJSON({
          geoJSON: JSON.parse(geoJsonData), // GeoJSON对象
          getPolygon: function(geojson, lnglats) { // 还可以自定义getMarker和getPolyline
            return new AMap.Polygon({
              path: lnglats,
              fillOpacity: 0.8,
              strokeColor: 'white',
              fillColor: 'red'
            })
          }
        })

        map.add(geoJson)

        // 创建一个 Marker 实例：
        var marker = new AMap.Marker({
        // position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          position: [113.3245904, 23.1066805], // 地理位置经纬度
          title: '广州塔', // 鼠标移上去时显示的内容
          offset: new AMap.Pixel(-100, -100), // 偏移量
          // 可以指定图标图片地址
          icon: '//vdata.amap.com/icons/b18/1/2.png', // 添加 Icon 图标 URL
          // 可以自定义标记点显示的内容,允许插入html字符串
          content: '<h1>广州塔Content</h1>'
        })

        // 插件的添加,第一个参数为插件名,第二个为回调函数
        AMap.plugin('AMap.ToolBar', function() {
        // 异步加载插件
          var toolbar = new AMap.ToolBar()
          map.addControl(toolbar)
        })

        // 将创建的点标记添加到已有的地图实例：
        map.add(marker)

        // 覆盖物1
        var polyline1 = new AMap.Polyline({
          path: [
            new AMap.LngLat('114.368904', '39.913423'),
            new AMap.LngLat('116.382122', '34.901176')
          ]
        })

        // 覆盖物2
        var polyline2 = new AMap.Polyline({
          path: [
            new AMap.LngLat('116.387271', '39.912501'),
            new AMap.LngLat('116.398258', '39.904600')
          ]
        })

        // 创建覆盖物群组，传入覆盖物组成的数组
        var overlayGroup = new AMap.OverlayGroup([polyline1, polyline2])

        // 对此覆盖物群组设置同一属性
        overlayGroup.setOptions({
          strokeColor: 'red',
          strokeWeight: 5
        })

        // 统一添加到地图实例上
        map.add(overlayGroup)

        // 同时也可以对群组进行统一的展示隐藏操作
        overlayGroup.show()
      // overlayGroup.hide();
      }
    }

  }
}
</script>

<style>

</style>
