import { Form, Field, ErrorMessage } from 'vee-validate'
import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'
import { useAlertLBStore } from '@/stores/alertLB'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useEmployeeStore } from '@/stores/employee'
import { useAuthStore } from '@/stores/auth'

export default {
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  setup() {
    const alertLBStore = useAlertLBStore()
    const loadingStore = useLoadingStore()
    const employeeStore = useEmployeeStore()
    const authStore = useAuthStore()
    const route = useRoute()

    const id = ref('')
    const form = reactive({
      id: '',
      name: '',
      account: '',
      email: '',
      status: useConstant.StatusCode.ACTIVE,
    })
    const editPasswordForm = reactive({
      id: '',
      password: '',
      password_confirmation: '',
    })
    const isShowEditPassword = ref(false)
    const info = computed(() => employeeStore.info)

    const back = (event) => {
      event.preventDefault()
      router.push({ path: '/employee' })
    }
    const onSubmitForm = async () => {
      loadingStore.open()
      const response = await useApi.employee.edit(form)
      loadingStore.close()
      if (response.code === useConstant.StatusCode.SUCCESS) {
        alertLBStore.open(response.message, useConstant.LBDirection.BACK, 'employee')
      } else {
        alertLBStore.open(response.message, useConstant.LBDirection.STAY)
      }
    }
    const onSubmitEditPasswordForm = async () => {
      isShowEditPassword.value = false
      loadingStore.open()
      const response = await useApi.employee.editPassword(editPasswordForm)
      loadingStore.close()
      alertLBStore.open(response.message, useConstant.LBDirection.STAY)
    }
    const getId = () => {
      id.value = route.params.id ? route.params.id : 0
    }
    const getInfo = async (params) => {
      loadingStore.open()
      await employeeStore.get(params)
      loadingStore.close()
    }
    const openEditPassword = (event) => {
      event.preventDefault()
      isShowEditPassword.value = true
    }
    const closeEditPassword = (event) => {
      event.preventDefault()
      isShowEditPassword.value = false
      editPasswordForm.password = ''
      editPasswordForm.password_confirmation = ''
    }
    onMounted(async () => {
      getId()
      await getInfo(id.value)
    })

    watch(
      () => info.value,
      (item) => {
        item = info.value
        editPasswordForm.id = id.value
        form.id = id.value
        form.name = item.name
        form.account = item.account
        form.email = item.email
        form.status = item.status
      },
      { deep: true, immediate: true },
    )

    return {
      info,
      form,
      editPasswordForm,
      isShowEditPassword,
      openEditPassword,
      closeEditPassword,
      back,
      onSubmitForm,
      onSubmitEditPasswordForm,
      authStore,
      useConstant,
    }
  },
}
