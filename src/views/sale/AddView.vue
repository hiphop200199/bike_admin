<script src="@/controllers/sale/Add.js"></script>
<template>
  <div class="container">
    <div class="main">
      <h1>新增銷售單</h1>
      <router-link class="back" to="/sale">返回</router-link>
      <VForm class="form" @submit="onSubmitForm()" v-slot="{ isSubmitting }">
        <p>新增銷售商品</p>
        <button @click="addSaleProduct($event)">新增</button>
        <div class="sale-product-area"></div>
        <p>銷售對象</p>
        <div>
          <VField as="select" name="sale_customer" v-model="form.sale_customer" rules="required">
            <option value="">請選擇銷售對象</option>
            <option value="1">後山咖啡</option>
            <option value="2">散客</option>
          </VField>
        </div>
        <ErrorMessage class="error" name="sale_customer"></ErrorMessage>
        <p>銷售日期</p>
        <div>
          <VField
            type="date"
            name="sale_date"
            v-model="form.sale_date"
            rules="required"
            placeholder="請輸入銷售日期"
          />
        </div>
        <ErrorMessage class="error" name="sale_date"></ErrorMessage>
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
