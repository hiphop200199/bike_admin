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
        <p>廠商</p>
        <p>{{ info.vendor_name }}</p>
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
        <p>顏色</p>
        <div>
          <VField
            type="text"
            name="color"
            v-model="form.color"
            rules="required"
            placeholder="請輸入顏色"
          />
        </div>
        <ErrorMessage class="error" name="color"></ErrorMessage>
        <p>承載限制</p>
        <div>
          <VField
            type="text"
            name="limit"
            v-model="form.limit"
            rules="required"
            placeholder="請輸入承載限制"
          />kg
        </div>
        <ErrorMessage class="error" name="limit"></ErrorMessage>
        <p>適用身高</p>
        <div>
          <VField
            type="text"
            name="height"
            v-model="form.height"
            rules="required"
            placeholder="請輸入適用身高"
          />cm
        </div>
        <ErrorMessage class="error" name="height"></ErrorMessage>
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
          <img :src="image.source ? image.source : '/image/upload.png'" alt="upload-image" />
        </label>
        <input
          type="file"
          @change="handleImage($event)"
          name="image"
          id="image"
          accept="image/png,image/jpg,image/jpeg"
        />
        <span>圖片格式：JPG,PNG，限5MB</span>
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
