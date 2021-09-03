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
      'https://webapi.amap.com/maps?v=1.4.15&key=fdb425952eca85ef36dbb245daeef0aa&callback=onLoad'
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
    mapFn() {
      var _this = this
      window.onLoad = function () {
        // 创建地图，同时给地图设置中心点、级别、显示模式、自定义样式等属性
        _this.map = new AMap.Map('mapChart', {
          resizeEnable: true,
          // center: [116.397428, 39.90923],
          viewMode: '3D', // 使用3D视图
          zoom: 13,
          mapStyle: 'amap://styles/darkblue'
        })
        // 使用clearMap方法删除所有覆盖物
        _this.map.clearMap()
        // 地图通过循环添加多个标记
        for (const val of _this.list) {
          new AMap.Marker({
            icon: val.citycode != undefined ? _this.style[0] : _this.style[1], // 添加标记图标 （这里是根据是否存在城市代码判断使用哪个图片）
            map: _this.map,
            position: val.center
          })
        }

        _this.map.setFitView()
      }
    }
  }
}
</script>

<style>

</style>
