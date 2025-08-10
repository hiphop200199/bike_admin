import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'
import { useAlertLBStore } from '@/stores/alertLB'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useConfirmLBStore } from '@/stores/confirmLB'
import Pagination from '@/components/Pagination.vue'
import { useVendorStore } from '@/stores/vendor'

export default {
  components: {
    Pagination,
  },
  setup() {
    const confirmLBStore = useConfirmLBStore()
    const alertLBStore = useAlertLBStore()
    const loadingStore = useLoadingStore()
    const vendorStore = useVendorStore()
    const route = useRoute()

    const defaultSearchQuery = {
      page: '1',
      perpage: '10',
    }

    const searchQuery = JSON.parse(JSON.stringify(defaultSearchQuery))

    const list = computed(() => vendorStore.list)
    const pagination = computed(() => vendorStore.pagination)
    const getQuery = async () => {
      searchQuery.page = route.query.page ? route.query.page : defaultSearchQuery.page
      router.push({ query: searchQuery })
    }
    const getList = async (params) => {
      loadingStore.open()
      await vendorStore.getList(params)
      loadingStore.close()
    }
    const setPage = async (page) => {
      searchQuery.page = page
      router.push({ query: searchQuery })
    }
    const destroy = async (id) => {
      loadingStore.open()
      const response = await useApi.vendor.destroy(id)
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
