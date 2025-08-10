import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useAlertLBStore } from '@/stores/alertLB'
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useConfirmLBStore } from '@/stores/confirmLB'
import { useConstant } from '@/constants'
import { useProductStore } from '@/stores/product'
import Pagination from '@/components/Pagination.vue'

export default {
  components: {
    Pagination,
  },
  setup() {
    const confirmLBStore = useConfirmLBStore()
    const alertLBStore = useAlertLBStore()
    const loadingStore = useLoadingStore()
    const productStore = useProductStore()
    const route = useRoute()

    const defaultSearchQuery = {
      page: '1',
      perpage: '10',
    }

    const searchQuery = JSON.parse(JSON.stringify(defaultSearchQuery))

    const list = computed(() => productStore.list)
    const pagination = computed(() => productStore.pagination)
    const getQuery = async () => {
      searchQuery.page = route.query.page ? route.query.page : defaultSearchQuery.page

      await router.push({ query: searchQuery })
    }
    const getList = async (params) => {
      loadingStore.open()
      await productStore.getList(params)
      loadingStore.close()
    }
    const setPage = async (page) => {
      searchQuery.page = page
      router.push({ query: searchQuery })
    }
    const destroy = async (id) => {
      loadingStore.open()
      const response = await useApi.product.destroy(id)
      loadingStore.close()
      alertLBStore.open(response.message, useConstant.LBDirection.RELOAD)
    }
    const destroyBtn = (id) => {
      confirmLBStore.open(useConstant.Description.CONFIRM_DELETE, destroy, id)
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
      destroyBtn,
      useConstant,
    }
  },
}
