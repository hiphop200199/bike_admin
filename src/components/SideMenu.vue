<script setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
const authStore = useAuthStore()
const loadingStore = useLoadingStore()
const logout = async () => {
  loadingStore.open()
  const redirectToLogin = await authStore.logout()
  loadingStore.close()
  if (redirectToLogin) {
    router.push('/')
  }
}
</script>
<template>
  <section class="side-menu">
    <h1>Bike Mart</h1>
    <h4>Hi!{{ authStore.userInfo.name }}</h4>
    <router-link
      :class="route.name?.includes('employee') ? 'active' : ''"
      to="/employee?page=1&perpage=10"
      >帳號管理</router-link
    >
    <router-link
      :class="route.name?.includes('product') ? 'active' : ''"
      to="/product?page=1&perpage=10"
      >商品管理</router-link
    >
    <router-link
      :class="route.name?.includes('banner') ? 'active' : ''"
      to="/banner?page=1&perpage=10"
      >首頁輪播圖管理</router-link
    >
    <router-link
      :class="route.name?.includes('vendor') ? 'active' : ''"
      to="/vendor?page=1&perpage=10"
      >進貨廠商管理</router-link
    >
    <router-link
      :class="route.name?.includes('businessInformation') ? 'active' : ''"
      to="/business-information?page=1&perpage=10"
      >企業資訊管理</router-link
    >
    <router-link
      :class="route.name?.includes('purchase') ? 'active' : ''"
      to="/purchase?page=1&perpage=10"
      >進貨管理</router-link
    >
    <router-link :class="route.name?.includes('sale') ? 'active' : ''" to="/sale?page=1&perpage=10"
      >銷貨管理</router-link
    >
    <router-link
      :class="route.name?.includes('stock') ? 'active' : ''"
      to="/stock?page=1&perpage=10&start_date=&end_date="
      >存貨管理</router-link
    >
    <a @click="logout()">登出</a>
  </section>
</template>
