import { Form, Field, ErrorMessage } from 'vee-validate'
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
      email: '',
    })

    const onSubmitForm = async () => {
      loadingStore.open()
      const response = await useApi.auth.forgotPassword(form)
      loadingStore.close()
      alertLBStore.open(response.message, useConstant.LBDirection.STAY)
    }

    return {
      onSubmitForm,
      form,
    }
  },
}
