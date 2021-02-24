<template>
  <div class="container" style="font-size: 13px;">
    <div class="inner">
      <div class="mod-breadcrumb">
        <a href="/">{{$t("home.home")}}</a>
        <span>&gt;</span>
        <strong>{{$t("home.trade")}}</strong>
      </div>

<div  class="mod-pagination mod-pagination-top">
  <pagination :currentPage.sync="pageNo"
              :limit.sync="pageSize"
              :totalCount="totalCount"
              @turn="getTxList"></pagination>
</div>

<!--      </div>-->
      <div class="module mod-list">
        <div class="hd"><h3>{{$t("home.trade")}}</h3></div>
        <div class="bd">
          <table class="only-pc">
            <thead>
            <tr>
              <th><span>{{$t("home.tradeHash")}}(TX)</span></th>
              <th><span>{{$t("home.blockHeight")}}</span></th>
              <th><span>{{$t("trade.tradeTime")}}</span></th>
              <th><span>{{$t("trade.sender")}}</span></th>
              <th>&nbsp;</th>
              <th><span>{{$t("trade.receiver")}}</span></th>
              <th><span>{{$t("trade.tradeNums1")}}</span></th>
              <th><span>{{$t("trade.transactionFee")}}</span></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item) in txListPage" :key="item.id">
              <td><router-link class="address"  :to="'/txs/'+item.txHash"
                     target="_blank">{{item.txHash}}</router-link></td>
              <td><router-link   :to="'/block/'+item.blockNumber" target="_blank">{{item.blockNumber}}</router-link></td>
              <td><span class="time">{{item.tradeTimeString}}</span></td>
              <td class="from"> <router-link class="address"
                                             :to="'/accounts/'+item.fromAddress"
                                                                 target="_blank">{{item.fromAddress}}</router-link>
              </td>
              <td>➜</td>
              <td class="to"> <router-link class="address"
                                           :to="'/accounts/'+item.toAddress"
                                                               target="_blank">{{item.toAddress}}</router-link>
              </td>
              <td><span>{{item.amount}} ACU</span></td>
              <td><span>{{item.gasPrice*item.gasUsed/1000000000000000000}} ACU </span></td>
            </tr>

            </tbody>
          </table>
          <ul class="only-mobile" v-for="(item) in txListPage" :key="item.id">
            <li>
              <div class="item">
                <div class="field">
                  <div class="key">{{$t("home.tradeHash")}}(TX)</div>
                  <div class="value"><router-link class="address"  :to="'/txs/'+item.txHash"
                                                  target="_blank">{{item.txHash}}</router-link>
                  </div>
                </div>
                <div class="field">
                  <div class="key">{{$t("home.blockHeight")}}</div>
                  <div class="value"><router-link :to="'/block/'+item.blockNumber" target="_blank">{{item.blockNumber}}</router-link></div>
                </div>
                <div class="field">
                  <div class="key">{{$t("trade.tradeTime")}}</div>
                  <div class="value"><span class="time">{{item.tradeTimeString}}</span></div>
                </div>
                <div class="field">
                  <div class="key">{{$t("trade.sender")}}</div>
                  <div class="value"> <router-link class="address"
                                                   :to="'/accounts/'+item.fromAddress"
                                                   target="_blank">{{item.fromAddress}}</router-link>
                  </div>
                </div>
                <div class="field">
                  <div class="key">{{$t("trade.receiver")}}</div>
                  <div class="value"> <router-link class="address"
                                                   :to="'/accounts/'+item.toAddress"
                                                   target="_blank">{{item.toAddress}}</router-link>
                  </div>
                </div>
                <div class="field">
                  <div class="key">{{$t("trade.tradeNums1")}}</div>
                  <div class="value"><span>{{item.amount}}ACU</span></div>
                </div>
                <div class="field">
                  <div class="key">{{$t("trade.transactionFee")}}</div>
                  <div class="value"><span>{{item.gasPrice*item.gasUsed/1000000000000000000}} ACU</span></div>
                </div>
              </div>
            </li>

          </ul>
        </div>
      </div>
      <div class="mod-pagination">
        <pagination :currentPage.sync="pageNo"
                    :limit.sync="pageSize"
                    :totalCount="totalCount"
                    @turn="getTxList"></pagination>
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
      txListPage:null,
      pageNo:1,
      pageSize:20,
      totalCount:0
    }
  },
  created(){

    const block = this.$route.params && this.$route.params.block
    if(block){
    }


    this.txListPage=null;
    this.getTxList(block)

  },


  methods:{
    getTxList(block){
      this.$api.get('/public/home/txList', {size:this.pageSize,pageNo:this.pageNo,block:block},response => {
        //console.info(response.data.code+"-----getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          this.txListPage=response.data.data.result;
          this.totalCount=response.data.data.totalCount;
          console.log(response.data.data);//请求成功，response为成功信息参数
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      })
    },


}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
