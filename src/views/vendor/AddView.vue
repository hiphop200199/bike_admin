<script src="@/controllers/vendor/Add.js"></script>
<template>
  <div class="container">
    <div class="main">
      <h1>新增進貨廠商</h1>
      <router-link class="back" to="/vendor">返回</router-link>
      <VForm class="form" @submit="onSubmitForm()" v-slot="{ isSubmitting }">
        <p>名稱</p>
        <div>
          <VField
            type="text"
            name="name"
            v-model="form.name"
            rules="required"
            placeholder="請輸入名稱"
          />
        </div>
        <ErrorMessage class="error" name="name"></ErrorMessage>
        <p>狀態</p>
        <section class="status">
          <p>
            <input type="radio" name="status" v-model="form.status" value="2" />啟用<input
              type="radio"
              name="status"
              v-model="form.status"
              value="1"
            />停用
          </p>
        </section>
        <section class="buttons">
          <button :disabled="isSubmitting">提交</button>
          <button @click="back($event)">取消</button>
        </section>
      </VForm>
    </div>
  </div>
</template>
