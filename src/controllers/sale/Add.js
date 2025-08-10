import { Form, Field, ErrorMessage } from 'vee-validate'
import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useApi } from '@/apis'
import { useConstant } from '@/constants'
import { useAlertLBStore } from '@/stores/alertLB'
import { computed, onMounted, reactive, ref } from 'vue'
import { useProductStore } from '@/stores/product'

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

    let saleProductArea
    const saleProductNumber = ref(0)
    const total = ref(0)
    const productList = computed(() => productStore.list)
    const form = reactive({
      sale_customer: '',
      total: 0,
      sale_date: '',
      employee_id: 1,
      detail: '',
    })

    const back = (event) => {
      event.preventDefault()
      router.push({ path: '/sale' })
    }
    const onSubmitForm = async () => {
      form.total = total.value
      let detailArray = []
      let selects = document.querySelectorAll('.sale-product-id')
      let amounts = document.querySelectorAll('.sale-product-amount')
      let prices = document.querySelectorAll('.sale-product-price')
      for (let i = 0; i < amounts.length; i++) {
        let detailItem = {}
        detailItem.sale_product_id = parseInt(selects[i].value, 10)
        detailItem.sale_product_name = selects[i].options[selects[i].selectedIndex].text
        detailItem.sale_product_price = parseInt(prices[i].value, 10)
        detailItem.sale_product_amount = parseInt(amounts[i].value, 10)
        detailArray.push(detailItem)
      }
      form.detail = JSON.stringify(detailArray)
      loadingStore.open()
      const response = await useApi.sale.add(form)
      loadingStore.close()
      if (response.code === useConstant.StatusCode.SUCCESS) {
        alertLBStore.open(response.message, useConstant.LBDirection.BACK, 'sale')
      } else {
        alertLBStore.open(response.message, useConstant.LBDirection.STAY)
      }
    }
    const addSaleProduct = (event) => {
      event.preventDefault()
      saleProductNumber.value += 1
      let div = document.createElement('div')
      div.classList.add('sale-product')
      let selectElement = document.createElement('select')
      selectElement.classList.add('sale-product-id')
      selectElement.id = 'spi-' + saleProductNumber.value
      let labelAmount = document.createElement('label')
      labelAmount.innerText = '數量：'
      let inputAmount = document.createElement('input')
      inputAmount.type = 'number'
      inputAmount.classList.add('sale-product-amount')
      inputAmount.id = 'spa-' + saleProductNumber.value
      inputAmount.min = 0
      inputAmount.placeholder = '請輸入商品數量'
      let labelPrice = document.createElement('label')
      labelPrice.innerText = '單價：'
      let inputPrice = document.createElement('input')
      inputPrice.type = 'number'
      inputPrice.classList.add('sale-product-price')
      inputPrice.id = 'spp-' + saleProductNumber.value
      inputPrice.min = 0
      inputPrice.placeholder = '請輸入商品單價'
      div.append(selectElement, labelAmount, inputAmount, labelPrice, inputPrice)
      saleProductArea.appendChild(div)
      let select = document.getElementById('spi-' + saleProductNumber.value)
      let amount = document.getElementById('spa-' + saleProductNumber.value)
      let price = document.getElementById('spp-' + saleProductNumber.value)
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
      let amounts = document.querySelectorAll('.sale-product-amount')
      let prices = document.querySelectorAll('.sale-product-price')
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

    onMounted(async () => {
      await getProductList()
      saleProductArea = document.querySelector('.sale-product-area')
    })

    return {
      back,
      onSubmitForm,
      form,
      total,
      productList,
      addSaleProduct,
    }
  },
}
