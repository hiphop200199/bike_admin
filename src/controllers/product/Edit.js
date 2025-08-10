import { Form, Field, ErrorMessage } from 'vee-validate'
import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useAlertLBStore } from '@/stores/alertLB'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useConstant } from '@/constants'

export default {
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  setup() {
    const alertLBStore = useAlertLBStore()
    const loadingStore = useLoadingStore()
    const productStore = useProductStore()
    const route = useRoute()

    const id = ref('')
    const form = reactive({
      id: '',
      name: '',
      price: 0,
      image: undefined,
      theme: '',
      language: '',
      author: '',
      publisher: '',
      publish_date: '',
      introduction: '',
      status: useConstant.StatusCode.ACTIVE,
    })
    const image = reactive({
      source: '',
    })
    const info = computed(() => productStore.info)

    const handleImage = async (event) => {
      const file = event.target.files[0]
      const allowFileTypes = ['image/png', 'image/jpg', 'image/jpeg']
      if (!file) {
        return
      }
      //file檔案大小用B計算
      if (file.size > 1 * 1024 * 1024) {
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
      router.push({ path: '/product' })
    }
    const onSubmitForm = async () => {
      loadingStore.open()
      const response = await useApi.product.edit(form)
      loadingStore.close()
      if (response.code === useConstant.StatusCode.SUCCESS) {
        alertLBStore.open(response.message, useConstant.LBDirection.BACK, 'product')
      } else {
        alertLBStore.open(response.message, useConstant.LBDirection.STAY)
      }
    }
    const getId = () => {
      id.value = route.params.id ? route.params.id : 0
    }
    const getInfo = async (params) => {
      loadingStore.open()
      await productStore.get(params)
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
        form.price = item.price
        form.theme = item.theme
        form.language = item.language
        form.author = item.author
        form.publisher = item.publisher
        form.publish_date = item.publish_date
        form.introduction = item.introduction
        form.status = item.status
        image.source = item.image_url
      },
      { deep: true, immediate: true },
    )

    return {
      info,
      image,
      handleImage,
      form,
      back,
      onSubmitForm,
    }
  },
}
