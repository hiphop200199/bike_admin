<script setup>
import { useAlertLBStore } from '@/stores/alertLB'
import { computed } from 'vue'

const lbStore = useAlertLBStore()
const isShow = computed(() => lbStore.isShow)
const message = computed(() => lbStore.message)
const close = lbStore.close
</script>
<template>
  <div class="mask" v-show="isShow">
    <div class="lightbox">
      <p>{{ message }}</p>
      <section class="buttons">
        <button @click="close()">確認</button>
      </section>
    </div>
  </div>
</template>
