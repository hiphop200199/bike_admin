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
      image: undefined,
      status: useConstant.StatusCode.ACTIVE,
    })
    const image = reactive({
      source: '',
    })
    const handleImage = async (event) => {
      const file = event.target.files[0]
      const allowFileTypes = ['image/png', 'image/jpg', 'image/jpeg']
      if (!file) {
        return
      }
      //file檔案大小用B計算
      if (file.size > 5 * 1024 * 1024) {
        event.target.value = ''
        form.image = undefined
        alertLBStore.open(
          useConstant.Description.FILE_SIZE_OVER_LIMIT,
          useConstant.LBDirection.STAY,
        )
        return
      }
      //檢查圖片格式
      if (!allowFileTypes.includes(file.type)) {
        event.target.value = ''
        form.image = undefined
        alertLBStore.open(useConstant.Description.INVALID_FILE_FORMAT, useConstant.LBDirection.STAY)
        return
      }

      //準備預覽圖片
      const reader = new FileReader()
      reader.onload = function (e) {
        image.source = e.target.result
      }
      reader.readAsDataURL(file)
      form.image = file
    }
    const back = (event) => {
      event.preventDefault()
      router.push({ path: '/banner' })
    }
    const onSubmitForm = async () => {
      loadingStore.open()
      const response = await useApi.banner.add(form)
      loadingStore.close()
      if (response.code === useConstant.StatusCode.SUCCESS) {
        alertLBStore.open(response.message, useConstant.LBDirection.BACK, 'banner')
      } else {
        alertLBStore.open(response.message, useConstant.LBDirection.STAY)
      }
    }
    return {
      back,
      onSubmitForm,
      form,
      image,
      handleImage,
    }
  },
}
