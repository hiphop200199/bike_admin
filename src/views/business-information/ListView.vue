<script src="@/controllers/business-information/List.js"></script>
<template>
  <div class="container">
    <div class="main">
      <div class="function">
        <router-link to="/business-information/add">新增企業資訊</router-link>
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>名稱</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.status == useConstant.StatusCode.ACTIVE ? '啟用' : '停用' }}</td>
            <td>
              <router-link :to="'/business-information/edit/' + item.id">🖊</router-link
              ><a @click="destroyBtn(item.id)">🗑</a>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination @set-page="setPage" :pagination="pagination" />
    </div>
  </div>
</template>
