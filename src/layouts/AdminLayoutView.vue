<script setup>
import AlertLB from '@/components/AlertLB.vue'
import ConfirmLB from '@/components/ConfirmLB.vue'
import Loading from '@/components/Loading.vue'
import SideMenu from '@/components/SideMenu.vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <SideMenu />
  <RouterView />
  <AlertLB />
  <ConfirmLB />
  <Loading />
</template>
