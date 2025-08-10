<script setup>
import AlertLB from '@/components/AlertLB.vue'
import ConfirmLB from '@/components/ConfirmLB.vue'
import Loading from '@/components/Loading.vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <RouterView />
  <AlertLB />
  <ConfirmLB />
  <Loading />
</template>
