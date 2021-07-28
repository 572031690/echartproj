<!--
针对于 /mappage 这条路径而显示出来的
在这个组件中, 通过子组件注册的方式, 要显示出Map.vue这个组件
-->
<template>
  <div class="com-page">
    <stock></stock>
  </div>
</template>

<script>
import Map from '@/components/Stock'
import Stock from '../components/Stock.vue'
export default {
  data () {
    return {}
  },
  methods: {},
  components: {
    'stock': Stock
  }
}
</script>

<style lang="less" scoped>
</style>
