import { Form, Field, ErrorMessage } from 'vee-validate'
import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'
import { useAlertLBStore } from '@/stores/alertLB'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBannerStore } from '@/stores/banner'

export default {
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  setup() {
    const alertLBStore = useAlertLBStore()
    const loadingStore = useLoadingStore()
    const bannerStore = useBannerStore()
    const route = useRoute()

    const id = ref('')
    const form = reactive({
      id: '',
      name: '',
      image: undefined,
      status: useConstant.StatusCode.ACTIVE,
    })
    const image = reactive({
      source: '',
    })
    const info = computed(() => bannerStore.info)
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
      const response = await useApi.banner.edit(form)
      loadingStore.close()
      if (response.code === useConstant.StatusCode.SUCCESS) {
        alertLBStore.open(response.message, useConstant.LBDirection.BACK, 'banner')
      } else {
        alertLBStore.open(response.message, useConstant.LBDirection.STAY)
      }
    }
    const getId = () => {
      id.value = route.params.id ? route.params.id : 0
    }
    const getInfo = async (params) => {
      loadingStore.open()
      await bannerStore.get(params)
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
        form.status = item.status
        image.source = item.image_url
      },
      { deep: true, immediate: true },
    )

    return {
      info,
      form,
      back,
      onSubmitForm,
      image,
      handleImage,
    }
  },
}
