import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'
import { useAlertLBStore } from '@/stores/alertLB'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useConfirmLBStore } from '@/stores/confirmLB'
import Pagination from '@/components/Pagination.vue'
import { useStockStore } from '@/stores/stock'

export default {
  components: {
    Pagination,
  },
  setup() {
    const confirmLBStore = useConfirmLBStore()
    const alertLBStore = useAlertLBStore()
    const loadingStore = useLoadingStore()
    const stockStore = useStockStore()
    const route = useRoute()

    const defaultSearchQuery = {
      page: '1',
      perpage: '10',
      start_date: '',
      end_date: '',
    }

    const searchQuery = JSON.parse(JSON.stringify(defaultSearchQuery))

    const list = computed(() => stockStore.list)
    const pagination = computed(() => stockStore.pagination)
    const getQuery = async () => {
      searchQuery.page = route.query.page ? route.query.page : defaultSearchQuery.page
      searchQuery.start_date = route.query.start_date
        ? route.query.start_date
        : defaultSearchQuery.start_date
      searchQuery.end_date = route.query.end_date
        ? route.query.end_date
        : defaultSearchQuery.end_date
      router.push({ query: searchQuery })
    }
    const getList = async (params) => {
      loadingStore.open()
      await stockStore.getList(params)
      loadingStore.close()
    }
    const setPage = async (page) => {
      searchQuery.page = page
      router.push({ query: searchQuery })
    }
    const conditionSearch = async () => {
      router.push({ query: searchQuery })
    }

    watch(
      () => route.query,
      async (val) => {
        if (val !== undefined && val != {}) {
          await getQuery()
          await getList(searchQuery)
        }
      },
      { deep: true, immediate: true },
    )

    return {
      list,
      pagination,
      setPage,
      conditionSearch,
      searchQuery,
      useConstant,
    }
  },
}
