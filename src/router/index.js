import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('@/views/home.vue')
  },
  {
    path: '/base/textLoader',
    name: 'TextLoader',
    component: ()=>import('@/views/base/textLoader.vue')
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})