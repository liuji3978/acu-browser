<template>
  <div class="wrapper">
    <div class="container" style="font-size: 13px;">
      <div class="inner">
        <div class="mod-breadcrumb">
          <a href="/">{{$t("home.home")}}</a>
          <span>&gt;</span>
          <strong>{{$t("account.all")}}</strong>
        </div>
        <div class="mod-pagination mod-pagination-top">
          <pagination :currentPage.sync="pageNo"
                      :limit.sync="pageSize"
                      :totalCount="totalCount"
                      @turn="getAccountList"></pagination>
          </div>
        <div class="module mod-list">
          <div class="hd"><h3>{{$t("account.all")}}</h3></div>
          <div class="bd">
            <table class="only-pc">
              <thead>
              <tr>
                <th width="8%"><span>{{$t("account.sort")}}</span></th>
                <th><span>{{$t("account.address")}}</span></th>
                <th><span>{{$t("account.balance")}}</span></th>
                <th><span>{{$t("account.rate")}}</span></th>
<!--                <th><span>{{$t("account.tradeNums1")}}</span></th>-->
              </tr>
              </thead>
              <tbody>
              <tr class="J_link" v-for="(item,index) in accountsList" :key="item.id">
                <td><span>{{index+1+(pageNo-1)*20}}</span></td>
                <td> <router-link class="address"  :to="'/accounts/'+item.address"

                                                      target="_blank">{{item.address}}</router-link>
                </td>
                <td><span>{{item.balance}} ACU</span></td>
                <td><span>{{ item.rate }}</span></td>
<!--                <td><span>850177</span></td>-->
              </tr>

              </tbody>
            </table>
            <ul class="only-mobile" v-for="(item,index) in accountsList" :key="item.id" >
              <li>
                <div class="item">
                  <div class="field">
                    <div class="key">{{$t("account.sort")}}</div>
                    <div class="value"><span>{{index+1+(pageNo-1)*20}}</span></div>
                  </div>
                  <div class="field">
                    <div class="key">{{$t("account.address")}}</div>
                    <div class="value"> <router-link class="address"  :to="'/accounts/'+item.address"

                                                     target="_blank">{{item.address}}</router-link>
                    </div>
                  </div>
                  <div class="field">
                    <div class="key">{{$t("account.balance")}}</div>
                    <div class="value"><span> {{item.balance}} ACU</span></div>
                  </div>
                  <div class="field">
                    <div class="key">{{$t("account.rate")}}</div>
                    <div class="value"><span>{{ item.rate }}</span></div>
                  </div>
<!--                  <div class="field">-->
<!--                    <div class="key">{{$t("account.tradeNums1")}}</div>-->
<!--                    <div class="value"><span>850177</span></div>-->
<!--                  </div>-->
                </div>
              </li>

            </ul>
          </div>
        </div>
        <div class="mod-pagination">
          <pagination :currentPage.sync="pageNo"
                      :limit.sync="pageSize"
                      :totalCount="totalCount"
                      @turn="getAccountList"></pagination>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
@import "../assets/css/common.css";
@import "../assets/css/block-index.css";
</style>
<script>
import Vue from 'vue'
import Api from '../api/index.js';
import pagination from './Pagination'
Vue.prototype.$api = Api;
export default {
  name: 'block',
  components:{pagination},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      accountsList:null,
      pageNo:1,
      pageSize:20,
      totalCount:0
    }
  },
  created(){


    this.getAccountList()

  },


  methods: {
    getAccountList () {
      this.$api.get('/public/home/getAccountsList', {pageSize: this.pageSize, pageNo: this.pageNo}, response => {
        //console.info(response.data.code + "-----getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          this.accountsList = response.data.data.result;
          this.totalCount = response.data.data.totalCount;
          //console.log(response.data.data);//请求成功，response为成功信息参数
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

