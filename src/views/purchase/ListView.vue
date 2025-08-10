<script src="@/controllers/purchase/List.js"></script>
<template>
  <div class="container">
    <div class="main">
      <div class="function">
        <router-link to="/purchase/add">新增訂購單</router-link>
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>訂購單編號</th>
            <th>訂購單狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.serial }}</td>
            <template v-if="item.purchase_status == useConstant.StatusCode.PURCHASE_WAIT">
              <td>待進貨</td>
            </template>
            <template v-else-if="item.purchase_status == useConstant.StatusCode.PURCHASE_OK">
              <td>已進貨</td>
            </template>
            <template v-else-if="item.purchase_status == useConstant.StatusCode.PURCHASE_CANCEL">
              <td>取消</td>
            </template>
            <template v-else>
              <td></td>
            </template>
            <td>
              <router-link :to="'/purchase/edit/' + item.id">🖊</router-link
              ><a @click="destroyBtn(item.id)">🗑</a>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination @set-page="setPage" :pagination="pagination" />
    </div>
  </div>
</template>
