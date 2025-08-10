<script src="@/controllers/Forgot.js"></script>

<template>
  <div class="login-container">
    <div class="box">
      <h1>Bike Mart</h1>
      <h2>後台管理系統</h2>
      <VForm class="form" @submit="onSubmitForm()" v-slot="{ isSubmitting }">
        <div>
          <VField
            type="email"
            name="email"
            v-model="form.email"
            rules="required|email"
            placeholder="請輸入email"
          />
        </div>
        <ErrorMessage class="error" name="email"></ErrorMessage>
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
