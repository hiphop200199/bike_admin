import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LoginLayoutView from '@/layouts/LoginLayoutView.vue'
import AdminLayoutView from '@/layouts/AdminLayoutView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: { layout: LoginLayoutView },
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      meta: { layout: LoginLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ForgotPasswordView.vue'),
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      meta: { layout: LoginLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ResetPasswordView.vue'),
    },
    {
      path: '/employee',
      name: 'employee',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/employee/ListView.vue'),
    },
    {
      path: '/employee/add',
      name: 'employeeAdd',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/employee/AddView.vue'),
    },
    {
      path: '/employee/edit/:id',
      name: 'employeeEdit',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/employee/EditView.vue'),
    },
    {
      path: '/product',
      name: 'product',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/product/ListView.vue'),
    },
    {
      path: '/product/add',
      name: 'productAdd',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/product/AddView.vue'),
    },
    {
      path: '/product/edit/:id',
      name: 'productEdit',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/product/EditView.vue'),
    },
    {
      path: '/business-information',
      name: 'businessInformation',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/business-information/ListView.vue'),
    },
    {
      path: '/business-information/add',
      name: 'businessInformationAdd',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/business-information/AddView.vue'),
    },
    {
      path: '/business-information/edit/:id',
      name: 'businessInformationEdit',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/business-information/EditView.vue'),
    },
    {
      path: '/banner',
      name: 'banner',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/banner/ListView.vue'),
    },
    {
      path: '/banner/add',
      name: 'bannerAdd',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/banner/AddView.vue'),
    },
    {
      path: '/banner/edit/:id',
      name: 'bannerEdit',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/banner/EditView.vue'),
    },
    {
      path: '/vendor',
      name: 'vendor',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/vendor/ListView.vue'),
    },
    {
      path: '/vendor/add',
      name: 'vendorAdd',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/vendor/AddView.vue'),
    },
    {
      path: '/vendor/edit/:id',
      name: 'vendorEdit',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/vendor/EditView.vue'),
    },
    {
      path: '/purchase',
      name: 'purchase',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/purchase/ListView.vue'),
    },
    {
      path: '/purchase/add',
      name: 'purchaseAdd',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/purchase/AddView.vue'),
    },
    {
      path: '/purchase/edit/:id',
      name: 'purchaseEdit',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/purchase/EditView.vue'),
    },
    {
      path: '/sale',
      name: 'sale',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/sale/ListView.vue'),
    },
    {
      path: '/sale/add',
      name: 'saleAdd',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/sale/AddView.vue'),
    },
    {
      path: '/sale/edit/:id',
      name: 'saleEdit',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/sale/EditView.vue'),
    },
    {
      path: '/stock',
      name: 'stock',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/stock/ListView.vue'),
    },
    {
      path: '/stock/info/:id',
      name: 'stockInfo',
      meta: { layout: AdminLayoutView },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/stock/InfoView.vue'),
    },
  ],
})

//預防沒權限的情況下瀏覽某些路由
router.beforeEach(async (to) => {
  const authstore = useAuthStore()
  const publicRoutes = ['login', 'forgotPassword', 'resetPassword']
  if (!publicRoutes.includes(to.name)) {
    const redirectToLogin = await authstore.checkLogin()

    if (redirectToLogin) {
      return { name: 'login' }
    }
  }
})

export default router
