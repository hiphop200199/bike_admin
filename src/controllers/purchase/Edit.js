import { Form, Field, ErrorMessage } from 'vee-validate'
import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'
import { useAlertLBStore } from '@/stores/alertLB'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useProductStore } from '@/stores/product'
import { useRoute } from 'vue-router'
import { usePurchaseStore } from '@/stores/purchase'

export default {
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  setup() {
    const alertLBStore = useAlertLBStore()
    const loadingStore = useLoadingStore()
    const purchaseStore = usePurchaseStore()
    const route = useRoute()
    const productStore = useProductStore()

    let purchaseProductArea
    const purchaseProductNumber = ref(0)
    const total = ref(0)
    const productList = computed(() => productStore.list)
    const id = ref('')
    const form = reactive({
      id: '',
      purchase_vendor: '',
      total: 0,
      purchase_date: '',
      purchase_status: 1,
      employee_id: 1,
      detail: [],
    })

    const info = computed(() => purchaseStore.info)

    const back = (event) => {
      event.preventDefault()
      router.push({ path: '/purchase' })
    }
    const onSubmitForm = async () => {
      form.total = total.value
      let detailArray = []
      let selects = document.querySelectorAll('.purchase-product-id')
      let amounts = document.querySelectorAll('.purchase-product-amount')
      let prices = document.querySelectorAll('.purchase-product-price')
      for (let i = 0; i < amounts.length; i++) {
        let detailItem = {}
        detailItem.purchase_product_id = parseInt(selects[i].value, 10)
        detailItem.purchase_product_name = selects[i].options[selects[i].selectedIndex].text
        detailItem.purchase_product_price = parseInt(prices[i].value, 10)
        detailItem.purchase_product_amount = parseInt(amounts[i].value, 10)
        detailArray.push(detailItem)
      }
      form.detail = JSON.stringify(detailArray)
      loadingStore.open()
      const response = await useApi.purchase.edit(form)
      loadingStore.close()
      if (response.code === useConstant.StatusCode.SUCCESS) {
        alertLBStore.open(response.message, useConstant.LBDirection.BACK, 'purchase')
      } else {
        alertLBStore.open(response.message, useConstant.LBDirection.STAY)
      }
    }
    const addPurchaseProduct = (event) => {
      event.preventDefault()
      purchaseProductNumber.value += 1
      let div = document.createElement('div')
      div.classList.add('purchase-product')
      let selectElement = document.createElement('select')
      selectElement.classList.add('purchase-product-id')
      selectElement.id = 'ppi-' + purchaseProductNumber.value
      let labelAmount = document.createElement('label')
      labelAmount.innerText = '數量：'
      let inputAmount = document.createElement('input')
      inputAmount.type = 'number'
      inputAmount.classList.add('purchase-product-amount')
      inputAmount.id = 'ppa-' + purchaseProductNumber.value
      inputAmount.min = 0
      inputAmount.placeholder = '請輸入商品數量'
      let labelPrice = document.createElement('label')
      labelPrice.innerText = '單價：'
      let inputPrice = document.createElement('input')
      inputPrice.type = 'number'
      inputPrice.classList.add('purchase-product-price')
      inputPrice.id = 'ppp-' + purchaseProductNumber.value
      inputPrice.min = 0
      inputPrice.placeholder = '請輸入商品單價'
      div.append(selectElement, labelAmount, inputAmount, labelPrice, inputPrice)
      purchaseProductArea.appendChild(div)
      let select = document.getElementById('ppi-' + purchaseProductNumber.value)
      let amount = document.getElementById('ppa-' + purchaseProductNumber.value)
      let price = document.getElementById('ppp-' + purchaseProductNumber.value)
      while (select.firstChild) {
        select.removeChild(select.firstChild)
      }
      let firstOption = `<option value="">請選擇商品</option>`
      select.innerHTML += firstOption
      for (const p of productList.value) {
        let option = `<option value="${p.id}">${p.name}</option>`
        select.innerHTML += option
      }
      amount.removeEventListener('change', countTotal)
      amount.addEventListener('change', countTotal)
      price.removeEventListener('change', countTotal)
      price.addEventListener('change', countTotal)
    }
    const countTotal = () => {
      let amounts = document.querySelectorAll('.purchase-product-amount')
      let prices = document.querySelectorAll('.purchase-product-price')
      total.value = 0
      for (let i = 0; i < amounts.length; i++) {
        if (amounts[i].value != '' && prices[i].value != '') {
          total.value += parseInt(amounts[i].value, 10) * parseInt(prices[i].value, 10)
        }
      }
    }
    const getProductList = async () => {
      loadingStore.open()
      await productStore.getAllList()
      loadingStore.close()
    }
    const getId = () => {
      id.value = route.params.id ? route.params.id : 0
    }
    const getInfo = async (params) => {
      loadingStore.open()
      await purchaseStore.get(params)
      loadingStore.close()
    }

    onMounted(async () => {
      getId()
      await getInfo(id.value)
      await getProductList()
      purchaseProductNumber.value = form.detail.length + 1
      purchaseProductArea = document.querySelector('.purchase-product-area')
    })

    watch(
      () => info.value,
      (item) => {
        item = info.value
        form.id = id.value
        form.purchase_vendor = item.purchase_vendor
        form.purchase_status = item.purchase_status
        form.purchase_date = item.purchase_date
        form.employee_id = item.employee_id
        form.detail = item.detail
        total.value = item.total
      },
      { deep: true, immediate: true },
    )

    return {
      info,
      form,
      back,
      onSubmitForm,
      total,
      productList,
      addPurchaseProduct,
      countTotal,
    }
  },
}
