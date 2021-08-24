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

    // // 创建一个 Marker 实例：
    // var marker = new AMap.Marker({
    //   // position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    //   position: [113.3245904, 23.1066805], // 地理位置经纬度
    //   title: "广州塔", // 鼠标移上去时显示的内容
    //   offset: new AMap.Pixel(-100, -100), // 偏移量
    //   // 可以指定图标图片地址
    //   icon: "//vdata.amap.com/icons/b18/1/2.png", // 添加 Icon 图标 URL
    //   // 可以自定义标记点显示的内容,允许插入html字符串
    //   content: "<h1>广州塔Content</h1>"
    // });
    // // 将创建的点标记添加到已有的地图实例：
    // map.add(marker);

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
