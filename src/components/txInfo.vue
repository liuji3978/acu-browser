<template>
  <div class="wrapper">
    <div class="container" style="font-size: 13px;">
      <div class="inner">
        <div class="mod-breadcrumb">
          <a href="/">{{$t("home.home")}}</a>
          <span>&gt;</span>
          <strong>{{$t("home.tradeInfo")}}</strong>
        </div>
        <div class="module mod-information">
          <div class="hd"><h3>{{$t("home.tradeInfo")}}</h3></div>
          <div class="bd">
            <table>
              <tbody>
              <tr>
                <td width="190" align="right">{{$t("home.tradeHash")}}</td>
                <td><span class="tx">{{txInfo.txHash}}</span></td>
              </tr>
              <tr>
                <td align="right">{{$t("trade.tradeStatus")}}</td>
                <td><span class="status success">{{$t("trade.tradeSuccess")}}</span></td>
              </tr>
              <tr>
                <td align="right">{{$t("home.blockHeight")}}</td>
                <td><router-link class="blockNumber" :to="'/block/'+txInfo.blockNumber" target="_blank">{{txInfo.blockNumber}}</router-link></td>
              </tr>
              <tr>
                <td align="right">{{$t("trade.tradeTime")}}</td>
                <td><span class="timestamp">{{txInfo.tradeTimeString}}</span></td>
              </tr>
              <tr>
                <td align="right">{{$t("trade.sender")}}</td>
                <td><router-link class="from"  :to="'/accounts/'+txInfo.fromAddress" target="_blank">{{txInfo.fromAddress}}</router-link></td>
              </tr>
              <tr>
                <td align="right">{{$t("trade.receiver")}}</td>
                <td><router-link class="to"  :to="'/accounts/'+txInfo.toAddress" target="_blank">{{txInfo.toAddress}}</router-link></td>
              </tr>
              <tr>
                <td align="right">{{$t("trade.tradeNums1")}}</td>
                <td><span class="value">{{txInfo.amount}} ACU </span></td>
              </tr>
              <tr>
                <td align="right">{{$t("trade.gasLimit")}}</td>
                <td><span class="gasLimit">{{txInfo.gas}}</span></td>
              </tr>
              <tr>
                <td align="right">{{$t("trade.gasUsed")}}</td>
                <td><span class="gasUsed">{{txInfo.gasUsed}} ({{txInfo.gasUsed*100/txInfo.gas}}%)</span></td>
              </tr>
              <tr>
                <td align="right">{{$t("trade.gasPrice")}}</td>
                <td><span class="gasPrice">{{txInfo.gasPrice/1000000000}}  (GWei)</span></td>
              </tr>

              <tr>
                <td align="right">{{$t("trade.transactionFee")}}</td>
                <td><span class="txFee">{{txInfo.gasPrice*txInfo.gasUsed/1000000000000000000}}  ACU </span></td>
              </tr>
              <tr>
                <td align="right">{{$t("trade.confirmation")}}</td>
                <td><span class="nonce">{{txInfo.confirmations}}</span></td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/css/common.css";
@import "../assets/css/detail_tx.css";
</style>
<script>
import Vue from 'vue'
import Api from '../api/index.js';
Vue.prototype.$api = Api;

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      txInfo:null

    }
  },
  created(){
    const txhash = this.$route.params && this.$route.params.txhash
    //console.log(txhash+"---1123123---")
    this.getTxInfo(txhash)
  },
  methods:{
    getTxInfo(txhash){
      this.$api.get('/public/home/getTxInfoByTxHash', {txHash:txhash},response => {
        //console.info(response.data.code+"---123123123--getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          //this.article=response.data.data;
          this.txInfo=response.data.data;
          //console.log(response.data.data);//请求成功，response为成功信息参数
        } else {
          //console.log(response.message);//请求失败，response为失败信息
        }
      })
    }

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
