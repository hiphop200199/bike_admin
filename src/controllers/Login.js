import { Form, Field, ErrorMessage } from 'vee-validate'
import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'
import { useAlertLBStore } from '@/stores/alertLB'
import { onMounted, reactive } from 'vue'
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
    const authStore = useAuthStore()

    const captchaImage = reactive({
      source: '',
    })
    const form = reactive({
      account: '',
      password: '',
      captcha: '',
    })

    const forgotPassword = (event) => {
      event.preventDefault()
      router.push({ path: '/forgot-password' })
    }

    const getCaptcha = async () => {
      loadingStore.open()
      const response = await useApi.auth.getCaptcha()
      loadingStore.close()
      if (response.code === useConstant.StatusCode.SUCCESS) {
        captchaImage.source = 'data:image/jpg;base64,' + response.data
      }
    }
    const onSubmitForm = async () => {
      loadingStore.open()
      const response = await authStore.login(form)
      loadingStore.close()
      if (response.redirectToEmployee) {
        alertLBStore.open(response.message, useConstant.LBDirection.BACK, 'employee')
      } else {
        getCaptcha()
        alertLBStore.open(response.message, useConstant.LBDirection.STAY)
      }
    }

    onMounted(async () => {
      await getCaptcha()
    })

    return {
      forgotPassword,
      onSubmitForm,
      form,
      captchaImage,
      getCaptcha,
    }
  },
}
