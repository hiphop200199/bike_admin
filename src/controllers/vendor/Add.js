import { Form, Field, ErrorMessage } from 'vee-validate'
import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'
import { useAlertLBStore } from '@/stores/alertLB'
import { reactive } from 'vue'

export default {
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  setup() {
    const loadingStore = useLoadingStore()
    const alertLBStore = useAlertLBStore()

    const form = reactive({
      name: '',
      status: useConstant.StatusCode.ACTIVE,
    })

    const back = (event) => {
      event.preventDefault()
      router.push({ path: '/vendor' })
    }
    const onSubmitForm = async () => {
      loadingStore.open()
      const response = await useApi.vendor.add(form)
      loadingStore.close()
      if (response.code === useConstant.StatusCode.SUCCESS) {
        alertLBStore.open(response.message, useConstant.LBDirection.BACK, 'vendor')
      } else {
        alertLBStore.open(response.message, useConstant.LBDirection.STAY)
      }
    }
    return {
      back,
      onSubmitForm,
      form,
    }
  },
}
