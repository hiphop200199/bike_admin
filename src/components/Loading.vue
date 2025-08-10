<script setup>
import { useLoadingStore } from '@/stores/loading'
import { computed } from 'vue'

const loadingStore = useLoadingStore()
const isShow = computed(() => loadingStore.isShow)
</script>
<template>
  <div class="mask" v-show="isShow">
    <div class="lightbox">
      <img src="../public/image/cycling.gif" alt="" />
    </div>
  </div>
</template>
