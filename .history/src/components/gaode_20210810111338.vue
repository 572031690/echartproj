<template>
  <div id="container">132</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    //   页面加载完,开始异步引入高德地图
    // 创建了一个回调函数,高德地图加载完毕会调用
    window.onLoad = function() {
      // 所有关于地图的逻辑全部都要写在这个回调里面
      // 保证高德地图加载完毕
      var map = new AMap.Map("container", {
        zoom: 20, // 级别
        center: [113.3245904, 23.1066805], // 中心点坐标
        viewMode: "3D" // 使用3D视图
      });
    };
    // key是申请的值
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=fdb425952eca85ef36dbb245daeef0aa&callback=onLoad";
    // 创建一个 script dom元素
    // doc需要补全document
    var jsapi = document.createElement("script");
    // 设定script标签属性
    jsapi.charset = "utf-8";
    jsapi.src = url;
    // 将API文件引入页面中,加载完毕以后会调用函数
    document.head.appendChild(jsapi);
  }
};
</script>

<style>
#container {
  width: 900px;
  height: 800px;
}
</style>
