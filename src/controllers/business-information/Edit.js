import { Form, Field, ErrorMessage } from 'vee-validate'
import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'
import { useAlertLBStore } from '@/stores/alertLB'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBusinessInformationStore } from '@/stores/businessInformation'

export default {
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  setup() {
    const alertLBStore = useAlertLBStore()
    const loadingStore = useLoadingStore()
    const businessInformationStore = useBusinessInformationStore()
    const route = useRoute()

    const id = ref('')
    const form = reactive({
      id: '',
      name: '',
      content: '',
      status: useConstant.StatusCode.ACTIVE,
    })

    const info = computed(() => businessInformationStore.info)

    const back = (event) => {
      event.preventDefault()
      router.push({ path: '/business-information' })
    }
    const onSubmitForm = async () => {
      loadingStore.open()
      const response = await useApi.businessInformation.edit(form)
      loadingStore.close()
      if (response.code === useConstant.StatusCode.SUCCESS) {
        alertLBStore.open(response.message, useConstant.LBDirection.BACK, 'business-information')
      } else {
        alertLBStore.open(response.message, useConstant.LBDirection.STAY)
      }
    }
    const getId = () => {
      id.value = route.params.id ? route.params.id : 0
    }
    const getInfo = async (params) => {
      loadingStore.open()
      await businessInformationStore.get(params)
      loadingStore.close()
    }

    onMounted(async () => {
      getId()
      await getInfo(id.value)
    })

    watch(
      () => info.value,
      (item) => {
        item = info.value
        form.id = id.value
        form.name = item.name
        form.content = item.content
        form.status = item.status
      },
      { deep: true, immediate: true },
    )

    return {
      info,
      form,
      back,
      onSubmitForm,
    }
  },
}
