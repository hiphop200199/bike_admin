<script src="@/controllers/banner/Edit.js"></script>
<template>
  <div class="container">
    <div class="main">
      <h1>編輯首頁輪播圖</h1>
      <router-link class="back" to="/banner">返回</router-link>
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

        <p>圖片</p>
        <label for="image">
          <VField
            as="img"
            name="image"
            :rules="image.source ? '' : 'required'"
            :src="image.source ? image.source : '../public/image/upload.png'"
            alt="upload-image"
          ></VField>
        </label>
        <input
          type="file"
          @change="handleImage($event)"
          id="image"
          accept="image/png,image/jpg,image/jpeg"
        />
        <span>圖片格式：JPG,PNG，限1MB</span>
        <br />
        <ErrorMessage class="error" name="image"></ErrorMessage>
        <br />
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
