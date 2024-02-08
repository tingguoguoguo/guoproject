// Composables
import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: {
          title: 'Day My Days',
          login: false,
          admin: false
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/front/RegisterView.vue'),
        meta: {
          title: 'Day My Days | 註冊',
          login: false, // 是否需要登入才能看
          admin: false // 是否需要是管理員才能看
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/front/LoginView.vue'),
        meta: {
          title: 'Day My Days | 登入',
          login: false,
          admin: false
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// 進到每個頁面後改變網頁標題
router.afterEach((to, from) => {
  document.title = to.meta.title
})

// 進去每個頁面前的判斷
router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    // 如果有登入，要去註冊或登入頁，重新導向回首頁
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    // 如果要去的頁面要登入，但是沒登入，重新導向回登入頁
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    // 如果要去的頁面要管理員，但不是管理員，重新導向回首頁
    next('/')
  } else {
    // 不重新導向
    next()
  }
})

export default router
