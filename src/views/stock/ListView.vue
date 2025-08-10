<script src="@/controllers/stock/List.js"></script>
<template>
  <div class="container">
    <div class="main">
      <div class="function">
        <div class="search-field">
          <label>日期區間：</label><input type="date" v-model="searchQuery.start_date" />~<input
            type="date"
            v-model="searchQuery.end_date"
          />
          <button @click="conditionSearch()">搜尋</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>存貨編號</th>
            <th>異動原因</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.serial }}</td>
            <td>
              {{
                item.stock_reason == useConstant.StatusCode.STOCK_REASON_PURCHASE ? '進貨' : '銷售'
              }}
            </td>
            <td>
              <router-link :to="'/stock/info/' + item.id">🔎︎</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination @set-page="setPage" :pagination="pagination" />
    </div>
  </div>
</template>
