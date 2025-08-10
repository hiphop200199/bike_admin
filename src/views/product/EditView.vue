<script src="@/controllers/product/Edit.js"></script>
<template>
  <div class="container">
    <div class="main">
      <h1>編輯商品</h1>
      <router-link class="back" to="/product">返回</router-link>
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
        <p>價格</p>
        <div>
          <VField
            type="number"
            name="price"
            min="0"
            v-model="form.price"
            rules="required"
            placeholder="請輸入價格"
          ></VField>
        </div>
        <ErrorMessage class="error" name="price"></ErrorMessage>
        <p>主題</p>
        <div>
          <VField
            type="text"
            name="theme"
            v-model="form.theme"
            rules="required"
            placeholder="請輸入主題"
          />
        </div>
        <ErrorMessage class="error" name="theme"></ErrorMessage>
        <p>語言</p>
        <div>
          <VField
            type="text"
            name="language"
            v-model="form.language"
            rules="required"
            placeholder="請輸入語言"
          />
        </div>
        <ErrorMessage class="error" name="language"></ErrorMessage>
        <p>作者</p>
        <div>
          <VField
            type="text"
            name="author"
            v-model="form.author"
            rules="required"
            placeholder="請輸入作者"
          />
        </div>
        <ErrorMessage class="error" name="author"></ErrorMessage>
        <p>出版社</p>
        <div>
          <VField
            type="text"
            name="publisher"
            v-model="form.publisher"
            rules="required"
            placeholder="請輸入出版社"
          />
        </div>
        <ErrorMessage class="error" name="publisher"></ErrorMessage>
        <p>出版日期</p>
        <div>
          <VField
            type="date"
            name="publish_date"
            v-model="form.publish_date"
            rules="required"
            placeholder="請輸入出版日期"
          />
        </div>
        <ErrorMessage class="error" name="publish_date"></ErrorMessage>
        <p>簡介</p>
        <div>
          <VField
            as="textarea"
            name="introduction"
            v-model="form.introduction"
            rules="required"
            placeholder="請輸入簡介"
          ></VField>
        </div>
        <ErrorMessage class="error" name="introduction"></ErrorMessage>
        <p>圖片（選填）</p>
        <label for="image">
          <img
            :src="image.source ? image.source : '../public/image/upload.png'"
            alt="upload-image"
          />
        </label>
        <input
          type="file"
          @change="handleImage($event)"
          name="image"
          id="image"
          accept="image/png,image/jpg,image/jpeg"
        />
        <span>圖片格式：JPG,PNG，限1MB</span>
        <br />
        <p>庫存</p>
        <p>{{ info.stock }}</p>
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
