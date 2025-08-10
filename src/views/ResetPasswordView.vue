<script src="@/controllers/Reset.js"></script>

<template>
  <div class="login-container">
    <div class="box">
      <h1>Bike Mart</h1>
      <h2>後台管理系統</h2>
      <VForm class="form" @submit="onSubmitForm()" v-slot="{ isSubmitting }">
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
        <div>
          <VField
            type="password"
            v-model="form.password_confirmation"
            name="password_confirmation"
            rules="required|confirmed:@password"
            placeholder="請確認密碼"
          />
        </div>
        <ErrorMessage class="error" name="password_confirmation"></ErrorMessage>
        <div class="buttons">
          <button :disabled="isSubmitting">送出</button>
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
