<script src="@/controllers/Login.js"></script>

<template>
  <div class="login-container">
    <div class="box">
      <h1>Bike Mart</h1>
      <h2>後台管理系統</h2>
      <VForm class="form" @submit="onSubmitForm()" v-slot="{ isSubmitting }">
        <div>
          <VField
            type="text"
            name="account"
            v-model="form.account"
            rules="required"
            placeholder="請輸入帳號"
          />
        </div>
        <ErrorMessage class="error" name="account"></ErrorMessage>
        <div>
          <VField
            type="password"
            name="password"
            v-model="form.password"
            rules="required"
            placeholder="請輸入密碼"
          />
        </div>
        <ErrorMessage class="error" name="password"></ErrorMessage>
        <div class="captcha-block">
          <VField
            type="text"
            name="captcha"
            v-model="form.captcha"
            rules="required"
            placeholder="驗證碼"
          />
          <img :src="captchaImage.source" />
          <button @click.prevent="getCaptcha()">⟲</button>
        </div>
        <ErrorMessage class="error" name="captcha"></ErrorMessage>
        <div class="buttons">
          <button :disabled="isSubmitting">登入</button>
          <button @click="forgotPassword($event)">忘記密碼</button>
        </div>
      </VForm>
      <h4 class="copyright">Copyright © BikeMart 2025 | All Rights Reserved.</h4>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container,
.side-menu {
  display: none;
}
</style>
