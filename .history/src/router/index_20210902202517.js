import Vue from 'vue'
import VueRouter from 'vue-router'
import SellerPage from '@/views/SellerPage'
import TrendPage from '@/views/TrendPage'
import MapPage from '@/views/MapPage'
import RankPage from '@/views/RankPage'
import HotPage from '@/views/HotPage'
import StockPage from '@/views/StockPage'
import Test from '../components/Test.vue'
import ScreenPage from '@/views/ScreenPage'
import gaode from '../components/gaode.vue'
import HubeiGaode from '../components/HubeiGaode.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/screen'
  },
  {
    path: '/screen',
    component: ScreenPage
  },
  {
    path: '/hubei',
    component: ScreenPage
  },
  {
    path: '/sellerpage',
    component: SellerPage
  },
  {
    path: '/trendpage',
    component: TrendPage
  },
  {
    path: '/mappage',
    component: MapPage
  },
  {
    path: '/rankpage',
    component: RankPage
  },
  {
    path: '/hotpage',
    component: HotPage
  },
  {
    path: '/stockpage',
    component: StockPage
  },
  {
    path: '/test',
    component: Test
  },
  {
    path: '/gaode',
    component: gaode
  }
]

const router = new VueRouter({
  routes
})

export default router
