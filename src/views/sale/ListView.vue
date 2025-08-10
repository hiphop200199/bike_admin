<script src="@/controllers/sale/List.js"></script>
<template>
  <div class="container">
    <div class="main">
      <div class="function">
        <router-link to="/sale/add">新增銷售單</router-link>
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>銷售單編號</th>
            <th>銷售對象</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.serial }}</td>
            <template v-if="item.sale_customer == useConstant.StatusCode.SALE_CUSTOMER_BUSINESS">
              <td>後山咖啡</td>
            </template>
            <template v-else-if="item.sale_customer == useConstant.StatusCode.SALE_CUSTOMER_OTHER">
              <td>散客</td>
            </template>
            <template v-else>
              <td></td>
            </template>
            <td>
              <router-link :to="'/sale/edit/' + item.id">🖊</router-link
              ><a @click="destroyBtn(item.id)">🗑</a>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination @set-page="setPage" :pagination="pagination" />
    </div>
  </div>
</template>
