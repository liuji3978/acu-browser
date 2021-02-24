<template>
  <div class="container" style="font-size: 13px;">
      <div class="inner">
        <div class="module mod-detail">
          <div class="left">

            <table>
              <tbody>
              <tr>
                <td class="th" width="60%">{{$t("home.lastBlock")}}</td>
                <td class="th" width="40%">{{$t("home.tradeVolume")}}</td>
              </tr>
              <tr>
                <td><span class="lastblock">{{blockInfo.block}}</span> (<span class="avgtime">{{blockInfo.timeStamp| formatDate}}s</span>)</td>
                <td><span class="transactions">{{blockInfo.txNum}}</span> </td>
              </tr>
              <tr>
                <td class="th">{{$t("block.totalDifficulty")}}</td>
                <td class="th">{{$t("home.blockDifficulty")}}</td>
              </tr>
              <tr>
                <td><span class="hashrate">{{blockInfo.totalDifficulty}} </span></td>
                <td><span class="difficulty">{{blockInfo.difficulty}} </span></td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>

        <div class="row">
          <div class="col">
            <div class="module mod-list">
              <div class="hd">
                <router-link to="/blocks/" target="_blank">{{$t("home.all")}} <i>&gt;&gt;</i></router-link>
                <h3>{{$t("home.blockHeight")}}</h3>
              </div>
              <div class="bd">
                <ul  v-for="(item) in blockList" :key="item.block">
                  <li>
                    <table>
                      <caption>{{$t("home.block")}}：<router-link  :to="'/blocks/'+item.block"  target="_blank">{{item.block}}</router-link></caption>
                      <tbody>
                      <tr>
                        <td>{{$t("home.since")}} <router-link  :to="'/accounts/'+item.miner"   target="_blank">{{item.miner}}</router-link>
                          {{$t("home.miner")}}
                        </td>
                        <td width="150" align="right">  {{$t("home.minerFee")}}</td>
                      </tr>
                      <tr>
                        <td>{{$t("home.at")}} {{item.timeStamp| formatDate}} {{$t("home.seconds")}} <router-link :to="'/blocks/'+item.block" target="_blank">{{ item.txNum }}</router-link> {{$t("home.tradeNums")}}</td>
                        <td width="150" align="right"><span class="fee">5 ACU</span></td>
                      </tr>
                      </tbody>
                    </table>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="module mod-list">
              <div class="hd">
                <router-link to="/txs/" target="_blank"> {{$t("home.all")}} <i>&gt;&gt;</i></router-link>
                <h3>{{$t("home.trade")}}</h3>
              </div>
              <div class="bd">
                <ul v-for="(item) in txList" :key="item.id">
                  <li>
                    <table>
                      <thead>
                      <tr>
                        <td><span>{{$t("home.tradeHash")}}</span>
                          <router-link
                              :to="'/txs/'+item.txHash"
                            target="_blank">{{item.txHash}}</router-link></td>
                        <td width="150" align="right"><span class="time">{{item.tradeTimeString}}</span></td>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td rowspan="2" style="vertical-align:bottom;"><span>{{$t("home.from")}}</span> <router-link class="address"

                                                                                                   :to="'/accounts/'+item.fromAddress"

                                                                                         target="_blank">{{item.fromAddress}}</router-link>
                          <span>{{$t("home.to")}}</span> <router-link class="address"  :to="'/accounts/'+item.toAddress"
                                            target="_blank">{{item.toAddress}}</router-link></td>
                        <td width="150" align="right">{{$t("home.tradeNums1")}}</td>
                      </tr>
                      <tr>
                        <td width="150" align="right"><span class="fee">{{item.amount}} ACU</span></td>
                      </tr>
                      </tbody>
                    </table>
                  </li>


                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>


</template>

<script>
import Vue from 'vue'
import Api from '../api/index.js';
Vue.prototype.$api = Api;



export default {
  name: 'Home',
  props: {
    msg: String
  },
  data(){
    return{
      CoinBase: "",
      HashRate: 0,
      blockNumber:0,
      blockList:null,
      txList:null,
      blockInfo:null,
      test:""
    }
  },
  filters: {
    formatDate: function (value) {
      var date2 = new Date();    //结束时间
      var date3 = date2.getTime() - value*1000;   //时间差的毫秒数
//计算出相差天数
      var days=Math.floor(date3/(24*3600*1000))

      //计算出小时数
      var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
      var hours=Math.floor(leave1/(3600*1000))
      //计算相差分钟数
      var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
      var minutes=Math.floor(leave2/(60*1000))
      //计算相差秒数
      var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
      var seconds=Math.round(leave3/1000)
      if(minutes==0){
        return seconds;
      }
      return minutes*60+seconds;
    }
  },
  created(){

    this.getBlockList()
    this.getTxList()

  },
  methods:{
    getBlockList(){
      this.$api.get('/public/home/blockList', {size:'7'},response => {
        //console.info(response.data.code+"-----getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          this.blockList=response.data.data.result;
          this.blockInfo=response.data.data.result[0];
          console.log(response.data.data);//请求成功，response为成功信息参数
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      })
    },
    getTxList(){
      this.$api.get('/public/home/txList', {size:'8'},response => {
        //console.info(response.data.code+"-----getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          this.txList=response.data.data.result;
          console.log(response.data.data);//请求成功，response为成功信息参数
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      })
    },


  }
}
</script>
<style scoped>
@import "../assets/css/common.css";
@import "../assets/css/index.css";
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->


