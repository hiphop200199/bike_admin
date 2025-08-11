<script src="@/controllers/purchase/Add.js"></script>
<template>
  <div class="container">
    <div class="main">
      <h1>新增訂購單</h1>
      <router-link class="back" to="/purchase">返回</router-link>
      <VForm class="form" @submit="onSubmitForm()" v-slot="{ isSubmitting }">
        <p>新增訂購商品</p>
        <button @click="addPurchaseProduct($event)">新增</button>
        <div class="purchase-product-area"></div>
        <p>廠商名稱</p>
        <div>
          <VField
            as="select"
            name="purchase_vendor"
            v-model="form.purchase_vendor"
            rules="required"
          >
            <option value="">請選擇訂購廠商</option>
            <option v-for="(item, index) in vendorList" :key="index" :value="item.name">
              {{ item.name }}
            </option>
          </VField>
        </div>
        <ErrorMessage class="error" name="purchase_vendor"></ErrorMessage>
        <p>訂購日期</p>
        <div>
          <VField
            type="date"
            name="purchase_date"
            v-model="form.purchase_date"
            rules="required"
            placeholder="請輸入訂購日期"
          />
        </div>
        <ErrorMessage class="error" name="purchase_date"></ErrorMessage>
        <p>總金額</p>
        <h2>NT${{ total }}</h2>
        <section class="buttons">
          <button :disabled="isSubmitting">提交</button>
          <button @click="back($event)">取消</button>
        </section>
      </VForm>
    </div>
  </div>
</template>
