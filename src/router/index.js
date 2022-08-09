import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/store'
  },
  {
    path: '/ebook',
    component: () => import('../views/ebook/index.vue'),
    children: [
      {
        path: ':fileName',
        component: () => import('../components/ebook/EbookReader.vue')
      }
    ]
  },
  {
    path: '/store',
    component: () => import('../views/store/index.vue'),
    redirect: '/store/shelf',
    children: [
      {
        path: 'home', //注意不能是'/home'，这样会表示是绝对路径
        component: () => import('../views/store/StoreHome.vue')
      },
      {
        path: 'list',
        component: () => import('../views/store/StoreList.vue'),
      },
      {
        path: 'detail',
        component: () => import('../views/store/StoreDetail.vue'),
      },
      {
        path: 'shelf',
        component: () => import('../views/store/StoreShelf.vue'),
      },
      {
        path: 'category',
        component: () => import('../views/store/StoreCategory.vue'),
      },
      {
        path: 'speaking',
        component: () => import('../views/store/StoreSpeaking.vue'),
      }
    ]
  },
  
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
