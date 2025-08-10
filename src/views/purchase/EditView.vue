<script src="@/controllers/purchase/Edit.js"></script>
<template>
  <div class="container">
    <div class="main">
      <h1>編輯訂購單</h1>
      <router-link class="back" to="/purchase">返回</router-link>
      <VForm class="form" @submit="onSubmitForm()" v-slot="{ isSubmitting }">
        <p>訂購編號</p>
        <p>{{ info.serial }}</p>
        <p>訂購人員</p>
        <p>{{ info.employee_name }}</p>
        <p>新增訂購商品</p>
        <button @click="addPurchaseProduct($event)">新增</button>
        <div class="purchase-product-area">
          <div class="purchase-product" v-for="(d, ind) in form.detail" :key="ind">
            <select class="purchase-product-id">
              <option value="">請選擇商品</option>
              <option
                :selected="d.purchase_product_id == item.id"
                v-for="(item, index) in productList"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
            <label>數量：</label>
            <input
              min="0"
              type="number"
              v-model="d.purchase_product_amount"
              @change="countTotal()"
              placeholder="請輸入商品數量"
              class="purchase-product-amount"
            />
            <label>單價：</label>
            <input
              min="0"
              type="number"
              v-model="d.purchase_product_price"
              @change="countTotal()"
              placeholder="請輸入商品單價"
              class="purchase-product-price"
            />
          </div>
        </div>
        <p>廠商名稱</p>
        <div>
          <VField
            as="select"
            name="purchase_vendor"
            v-model="form.purchase_vendor"
            rules="required"
          >
            <option value="">請選擇訂購廠商</option>
            <option value="九歌出版社">九歌出版社</option>
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
        <p>訂購單狀態</p>
        <section class="status">
          <p>
            <input
              type="radio"
              name="purchase_status"
              v-model="form.purchase_status"
              value="1"
            />待進貨<input
              type="radio"
              name="purchase_status"
              v-model="form.purchase_status"
              value="2"
            />已進貨<input
              type="radio"
              name="purchase_status"
              v-model="form.purchase_status"
              value="3"
            />取消
          </p>
        </section>
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
