import { Form, Field, ErrorMessage } from 'vee-validate'
import { useLoadingStore } from '@/stores/loading'
import { useConstant } from '@/constants'
import { useAlertLBStore } from '@/stores/alertLB'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

export default {
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  setup() {
    const loadingStore = useLoadingStore()
    const alertLBStore = useAlertLBStore()
    const authstore = useAuthStore()
    const route = useRoute()

    const form = reactive({
      hash: '',
      password: '',
      password_confirmation: '',
    })

    const onSubmitForm = async () => {
      loadingStore.open()
      const response = await authstore.resetPassword(form)
      loadingStore.close()
      if (response.redirectToEmployee) {
        alertLBStore.open(response.message, useConstant.LBDirection.BACK, 'employee')
      } else {
        alertLBStore.open(response.message, useConstant.LBDirection.STAY)
      }
    }
    const getQuery = async () => {
      form.hash = route.query.hash ? route.query.hash : ''
      if (!form.hash) {
        router.push('/')
      }
    }

    onMounted(async () => {
      await getQuery()
    })

    return {
      onSubmitForm,
      form,
    }
  },
}
