import { Form, Field, ErrorMessage } from 'vee-validate'
import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'
import { useAlertLBStore } from '@/stores/alertLB'
import { computed, onMounted, reactive, ref } from 'vue'
import { useProductStore } from '@/stores/product'
import { useVendorStore } from '@/stores/vendor'

export default {
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  setup() {
    const loadingStore = useLoadingStore()
    const alertLBStore = useAlertLBStore()
    const productStore = useProductStore()
    const vendorStore = useVendorStore()

    let purchaseProductArea
    const purchaseProductNumber = ref(0)
    const total = ref(0)
    const vendorList = computed(() => vendorStore.list)
    const productList = computed(() => productStore.list)
    const form = reactive({
      purchase_vendor: '',
      total: 0,
      purchase_date: '',
      employee_id: 1,
      detail: '',
    })

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
      const response = await useApi.purchase.add(form)
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
    const countTotal = (event) => {
      let amounts = document.querySelectorAll('.purchase-product-amount')
      let prices = document.querySelectorAll('.purchase-product-price')
      total.value = 0
      for (let i = 0; i < amounts.length; i++) {
        if (amounts[i].value != '' && prices[i].value != '') {
          total.value += parseInt(amounts[i].value, 10) * parseInt(prices[i].value, 10)
        }
      }
    }
    const getProductList = async (event) => {
      event.preventDefault()
      const params = {
        vendor: event.target.value,
      }
      loadingStore.open()
      await productStore.getListByVendor(params)
      loadingStore.close()
    }
    const getVendorList = async () => {
      loadingStore.open()
      await vendorStore.getAllList()
      loadingStore.close()
    }
    onMounted(async () => {
      await getVendorList()
      purchaseProductArea = document.querySelector('.purchase-product-area')
    })

    return {
      back,
      onSubmitForm,
      form,
      total,
      productList,
      vendorList,
      addPurchaseProduct,
      getProductList,
    }
  },
}
