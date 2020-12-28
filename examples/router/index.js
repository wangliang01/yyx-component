
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/form')
  },
  {
    path: '/input-number',
    name: 'InputNumber',
    component: () => import('../views/input-number')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/upload')
  }
]

const router = new VueRouter({
  routes
})

export default router
