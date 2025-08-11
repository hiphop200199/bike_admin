<script src="@/controllers/employee/Add.js"></script>
<template>
  <div class="container">
    <div class="main">
      <h1>新增員工</h1>
      <router-link class="back" to="/employee">返回</router-link>
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
        <p>帳號</p>
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
        <p>密碼</p>
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
        <p>email</p>
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
        <!--  <p>圖片</p>
        <label for="image">
          <img src="@/assets/images/upload.png" alt="upload-image" />
        </label>
        <input type="file" name="" id="image" accept="image/png,image/jpg,image/jpeg,image/gif" />
        <span>圖片格式：JPG,PNG,GIF，限5MB</span>
        <br /> -->
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
