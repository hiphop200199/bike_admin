import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'
import { useAlertLBStore } from '@/stores/alertLB'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useConfirmLBStore } from '@/stores/confirmLB'
import Pagination from '@/components/Pagination.vue'
import { useBannerStore } from '@/stores/banner'

export default {
  components: {
    Pagination,
  },
  setup() {
    const confirmLBStore = useConfirmLBStore()
    const alertLBStore = useAlertLBStore()
    const loadingStore = useLoadingStore()
    const bannerStore = useBannerStore()
    const route = useRoute()

    const defaultSearchQuery = {
      page: '1',
      perpage: '10',
    }

    const searchQuery = JSON.parse(JSON.stringify(defaultSearchQuery))

    const list = computed(() => bannerStore.list)
    const pagination = computed(() => bannerStore.pagination)
    const getQuery = async () => {
      searchQuery.page = route.query.page ? route.query.page : defaultSearchQuery.page
      router.push({ query: searchQuery })
    }
    const getList = async (params) => {
      loadingStore.open()
      await bannerStore.getList(params)
      loadingStore.close()
    }
    const setPage = async (page) => {
      searchQuery.page = page
      router.push({ query: searchQuery })
    }
    const destroy = async (id) => {
      loadingStore.open()
      const response = await useApi.banner.destroy(id)
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
