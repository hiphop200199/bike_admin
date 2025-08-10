import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'
import { useAlertLBStore } from '@/stores/alertLB'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStockStore } from '@/stores/stock'

export default {
  setup() {
    const alertLBStore = useAlertLBStore()
    const loadingStore = useLoadingStore()
    const stockStore = useStockStore()
    const route = useRoute()

    const id = ref('')

    const info = computed(() => stockStore.info)

    const back = (event) => {
      event.preventDefault()
      router.push({ path: '/stock' })
    }

    const getId = () => {
      id.value = route.params.id ? route.params.id : 0
    }
    const getInfo = async (params) => {
      loadingStore.open()
      await stockStore.get(params)
      loadingStore.close()
    }

    onMounted(async () => {
      getId()
      await getInfo(id.value)
    })

    return {
      info,
      back,
      useConstant,
    }
  },
}
