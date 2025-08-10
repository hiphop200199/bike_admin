<script setup>
import { useConfirmLBStore } from '@/stores/confirmLB'
import { computed } from 'vue'

const lbStore = useConfirmLBStore()
const isShow = computed(() => lbStore.isShow)
const message = computed(() => lbStore.message)
const execute = lbStore.execute
const close = lbStore.close
</script>
<template>
  <div class="mask" v-show="isShow">
    <div class="lightbox">
      <p>{{ message }}</p>
      <section class="buttons">
        <button @click="execute()">確認</button>
        <button @click="close()">取消</button>
      </section>
    </div>
  </div>
</template>
