<script src="@/controllers/business-information/Add.js"></script>
<template>
  <div class="container">
    <div class="main">
      <h1>新增企業資訊</h1>
      <router-link class="back" to="/business-information">返回</router-link>
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
        <p>內容</p>
        <div>
          <VField
            as="textarea"
            name="content"
            v-model="form.content"
            rules="required"
            placeholder="請輸入內容"
          ></VField>
        </div>
        <ErrorMessage class="error" name="content"></ErrorMessage>
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
