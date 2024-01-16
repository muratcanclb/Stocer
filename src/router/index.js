import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/admin/activities',
      name: 'activities',
      component: () => import('@/views/Activities.vue'),
      meta: {
        pageTitle: 'Aktiviteler',
        breadcrumb: [
          {
            text: 'Aktiviteler',
            active: true,
          },
        ],
      },
    },
    {
      path: '/admin/edit-activities/:id',
      name: 'editActivities',
      component: () => import('@/views/EditActivities.vue'),
      meta: {
        pageTitle: 'Aktivite Düzenle',
        breadcrumb: [
          {
            text: 'DÜZENLE',
            active: true,
          },
        ],
      },
    },
    {
      path: '/admin/edit-department/:id',
      name: 'editDepartment',
      component: () => import('@/views/EditDepartment.vue'),
      meta: {
        pageTitle: 'Departman Düzenle',
        breadcrumb: [
          {
            text: 'DÜZENLE',
            active: true,
          },
        ],
      },
    },
   
    {
      path: '/weather',
      name: 'weather',
      component: () => import('@/views/Weather.vue'),
      meta: {
        pageTitle: 'HAVA DURUMU',
        breadcrumb: [
          {
            text: 'HAVA DURUMU',
            active: true,
          },
        ],
      },
    },
    {
      path: '/prayerTime',
      name: 'prayertime',
      component: () => import('@/views/PrayerTime.vue'),
      meta: {
        pageTitle: 'Namaz Vakitleri',
        breadcrumb: [
          {
            text: 'Namaz Vakitleri',
            active: true,
          },
        ],
      },
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/Products',
      name: 'products',
      component: () => import('@/views/Products.vue'),
      meta: {
        pageTitle: 'ÜRÜNLER',
        breadcrumb: [
          {
            text: 'Ürünler',
            active: true,
          },
        ],
      },
    },
    {
      path: '/Departments',
      name: 'departments',
      component: () => import('@/views/Departments.vue'),
      meta: {
        pageTitle: 'DEPARTMANLAR',
        breadcrumb: [
          {
            text: 'Departmanlar',
            active: true,
          },
        ],
      },
    },
    {
      path: '/Stocks',
      name: 'stocks',
      component: () => import('@/views/Stock.vue'),
      meta: {
        pageTitle: 'STOK',
        breadcrumb: [
          {
            text: 'Stoklar',
            active: true,
          },
        ],
      },
    },
    {
      path: '/Sales',
      name: 'sales',
      component: () => import('@/views/Sale.vue'),
      meta: {
        pageTitle: 'ÜRÜN İŞLEMLERİ',
        breadcrumb: [
          {
            text: 'İşlemler',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
