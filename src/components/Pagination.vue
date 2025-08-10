<script setup>
import { watch } from 'vue'

const props = defineProps(['pagination'])
const showpages = 3 //每次顯示幾筆頁碼連結
let curpage
let perpage
let total
let totalpage //總頁數
let showlist = []

watch(
  () => props,
  () => {
    curpage = parseInt(props.pagination.curpage, 10)
    perpage = parseInt(props.pagination.perpage, 10)
    total = parseInt(props.pagination.total, 10)
    totalpage = total % perpage == 0 ? Math.floor(total / perpage) : Math.floor(total / perpage) + 1
    if (totalpage <= showpages) {
      showlist = []
      for (let i = 0; i < totalpage; i++) {
        showlist.push(i + 1)
      }
    } else {
      if (curpage == 1) {
        showlist = [1, 2, 3]
      } else if (curpage == totalpage) {
        showlist = [totalpage - 2, totalpage - 1, totalpage]
      } else {
        showlist = [curpage - 1, curpage, curpage + 1]
      }
    }
  },
  { deep: true },
)
</script>

<template>
  <div class="pagination">
    <template v-if="totalpage > 1">
      <a v-if="curpage != 1" @click="$emit('setPage', 1)">＜＜</a>
      <a v-if="curpage != 1" @click="$emit('setPage', curpage - 1)">＜</a>

      <a
        v-for="(item, index) in showlist"
        :key="index"
        :class="item == curpage ? 'active' : ''"
        @click="$emit('setPage', item)"
        >{{ item }}</a
      >
      <a v-if="curpage != totalpage" @click="$emit('setPage', curpage + 1)">＞</a>
      <a v-if="curpage != totalpage" @click="$emit('setPage', totalpage)">＞＞</a>
    </template>
  </div>
</template>
