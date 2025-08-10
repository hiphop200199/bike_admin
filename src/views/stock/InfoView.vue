<script src="@/controllers/stock/Info.js"></script>
<template>
  <div class="container">
    <div class="main">
      <h1>存貨明細</h1>
      <router-link class="back" to="/stock">返回</router-link>
      <div class="form">
        <p>存貨編號</p>
        <p>{{ info.serial }}</p>
        <p>存貨異動人員</p>
        <p>{{ info.employee_name }}</p>
        <p>存貨異動原因</p>
        <p>
          {{ info.stock_reason == useConstant.StatusCode.STOCK_REASON_PURCHASE ? '進貨' : '銷售' }}
        </p>
        <p>存貨異動商品</p>
        <div class="stock-product-area">
          <div class="stock-product" v-for="(d, ind) in info.detail" :key="ind">
            <label>商品名稱：<input type="text" disabled :value="d.stock_product_name" /></label>
            <label
              >數量異動：<input type="number" disabled :value="d.stock_product_amount"
            /></label>
          </div>
        </div>
        <p>存貨異動日期</p>
        <div>
          <input type="date" v-model="info.stock_date" disabled />
        </div>
      </div>
    </div>
  </div>
</template>
