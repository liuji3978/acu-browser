<template>
  <div class="wrapper">
    <div class="container" style="font-size: 13px;">
      <div class="inner">
        <div class="mod-breadcrumb">
          <a href="/">{{$t("home.home")}}</a>
          <span>&gt;</span>
          <a href="/accounts/">{{$t("account.account")}}</a>
          <span>&gt;</span>
          <strong>{{$t("account.accountInfo")}}</strong>
        </div>
        <div class="module mod-information">
          <div class="hd"><h3>{{$t("account.accountInfo")}}</h3></div>
          <div class="bd">
            <div class="info">
              <div class="address">{{address}}</div>
<!--              <div class="score"><span class="title">账户评分：</span><span class="value">5.5</span></div>-->
            </div>
            <div class="detail">
              <div class="box">
                <table>
                  <caption>
                    <span>{{$t("account.summary")}}</span>
                    <a class="qr-trigger" href="javascript:;" rel="nofollow" @click="showEwm">
                      <img src="/static/image/account/icon-qrcode.png" alt="钱包二维码">
                      <span class="qrcode" data-text="-"></span>

<!--                      <Modal v-model="isShowEwm" width="280">-->
<!--                        &lt;!&ndash;<div v-show="isShowEwm" class="show-qrcode">&ndash;&gt;-->
<!--                        <p slot="header" style="text-align: center;">{{$t('uc.finance.recharge.qrcodeaddress')}}</p>-->
<!--                        <div class="show-qrcode" style="text-align: center;padding: 15px 10px;border-radius:10px;background:#FFF;">-->
<!--                          &lt;!&ndash;<qriously :value="qrcode.coinName+':'+qrcode.value" :size="qrcode.size" />&ndash;&gt;-->
<!--                          <qriously :value="qrcode.value" :size="qrcode.size" foreground="#000" />-->
<!--                        </div>-->
<!--                        <div slot="footer"></div>-->
<!--                      </Modal>-->
                    </a>
                  </caption>
                  <tbody>
                  <tr>
                    <td width="35%"><span class="label">ACU  {{$t("account.balance")}}</span></td>
                    <td align="right"><span class="eth">{{amount}} ACU</span></td>
                  </tr>

<!--                  <tr>-->
<!--                    <td><span class="label">最近区块转账数量</span></td>-->
<!--                    <td align="right"><span class="transactions">849005</span>笔</td>-->
<!--                  </tr>-->
                  </tbody>
                </table>
              </div>
<!--              <div class="box">-->
<!--                <table>-->
<!--                  <caption>-->
<!--                    <span>其他</span>-->
<!--                  </caption>-->
<!--                  <tbody>-->
<!--                  <tr>-->
<!--                    <td width="35%"><span class="label">代币余额</span></td>-->
<!--                    <td align="right">-->
<!--                      <button class="view">查看代币</button>-->
<!--                      <div class="list">-->
<!--                        <ul>-->
<!--                          <li><p>暂无数据...</p></li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </td>-->
<!--                  </tr>-->
<!--                  </tbody>-->
<!--                </table>-->
<!--              </div>-->
            </div>
          </div>
        </div>
        <div class="module mod-tabs">
          <div class="hd">
            <ul class="tabs-nav">
              <li class="active"><a href="#tab1" rel="nofollow">{{$t("account.transferList")}}</a></li>
<!--              <li><a href="#tab2" rel="nofollow">代币转账<span class="count">(0)</span></a></li>-->
            </ul>
          </div>
          <div class="bd">
            <div class="tabs-content">
              <div class="panel" style="display: block;">
                <div class="table-wrap">
                  <table class="only-pc">
                    <thead>
                    <tr>
                      <th><span>{{$t("home.tradeHash")}}(TX)</span></th>
                      <th><span>{{$t("home.blockHeight")}}</span></th>
                      <th><span>{{$t("trade.tradeTime")}}</span></th>
                      <th><span>{{$t("trade.sender")}}</span></th>
                      <th><span>&nbsp;</span></th>
                      <th><span>{{$t("trade.receiver")}}</span></th>
                      <th><span>{{$t("trade.tradeNums1")}}</span></th>
                      <th><span>{{$t("trade.transactionFee")}}</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item) in txList" :key="item.id">
                      <td><router-link class="address"
                                       :to="'/txs/'+item.txHash"

                             target="_blank">{{item.txHash}}</router-link></td>
                      <td><router-link :to="'/blocks/'+item.blockNumber" target="_blank">{{item.blockNumber}}</router-link></td>
                      <td><span class="time">{{item.tradeTimeString}}</span></td>
                      <td class="from"> <router-link class="address"
                                           :to="'/accounts/'+item.fromAddress" target="_blank">{{item.fromAddress}}</router-link>
                      </td>
                      <td>

                        <span class="tag-out" v-if="item.fromAddress==address">{{$t("account.out")}}</span>
                        <span class="tag-in" v-else-if="item.fromAddress!=address">{{$t("account.in")}}</span>
                      </td>
                      <td class="to"> <router-link class="address"
                                                   :to="'/accounts/'+item.toAddress"
                                                                       target="_blank">{{item.toAddress}}</router-link>
                      </td>
                      <td><span>{{item.amount}} ACU</span></td>
                      <td><span>{{item.gasPrice*item.gasUsed/1000000000000000000}} ACU</span></td>
                    </tr>

                    </tbody>
                  </table>
                  <ul class="only-mobile"  v-for="(item) in txList" :key="item.id">
                    <li>
                      <div class="item">
                        <div class="field">
                          <div class="key">{{$t("home.tradeHash")}}(TX)</div>
                          <div class="value"><router-link class="address"
                                                          :to="'/txs/'+item.txHash"

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
                          <div class="value">  <router-link class="address"
                                                            :to="'/accounts/'+item.fromAddress" target="_blank">{{item.fromAddress}}</router-link>
                          </div>
                        </div>
                        <div class="field">
                          <div class="key"></div>
                          <div class="value">
                            <span class="tag-out" v-if="item.fromAddress==address">{{$t("account.out")}}</span>
                            <span class="tag-in" v-else-if="item.fromAddress!=address">{{$t("account.in")}}</span>
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
                          <div class="value"><span>{{item.amount}} ACU</span></div>
                        </div>
                        <div class="field">
                          <div class="key">{{$t("trade.transactionFee")}}</div>
                          <div class="value"><span>{{item.gasPrice*item.gasUsed/1000000000000000000}} ACU </span></div>
                        </div>
                      </div>
                    </li>



                  </ul>
                </div>
                <div class="mod-pagination">
                  <pagination :currentPage.sync="pageNo"
                              :limit.sync="pageSize"
                              :totalCount="totalCount"
                              @turn="getTxList"></pagination>
                </div>
              </div>
              <div class="panel" style="display: none;">
                <div class="table-wrap">
                  <table class="only-pc">
                    <thead>
                    <tr>
                      <th><span>交易标识(TX)</span></th>
                      <th><span>交易时间</span></th>
                      <th><span>发送方</span></th>
                      <th><span>&nbsp;</span></th>
                      <th><span>接收方</span></th>
                      <th><span>交易量</span></th>
                      <th><span>代币</span></th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                  <ul class="only-mobile"></ul>
                </div>
                <div class="mod-pagination">
                  <ul></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
@import "../assets/css/common.css";
@import "../assets/css/detail.css";
</style>
<script>
import Vue from 'vue'
import Api from '../api/index.js';
import pagination from './Pagination'
import QRCode from 'qrcodejs2';
Vue.prototype.$api = Api;
export default {
  name: 'accountInfo',
  components:{pagination},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      amount:0,
      address:'',
      txList:null,
      pageNo:1,
      pageSize:20,
      totalCount:0,
      isShowEwm:false,

      qrcode: {
        value: "",
        size: 220,
        coinName: "",
        unit: ""
      },
    }
  },
  created(){
    const address = this.$route.params && this.$route.params.address
    //console.log(address+"---1123123---")
    this.address=address;
    this.txList=null;
    this.getBalance(address)
    this.getTxList(address)
  },
  methods:{
    showEwm(){
      this.isShowEwm = !this.isShowEwm;
    },
    getBalance(address){
      this.$api.get('/public/home/getBalance', {address:address},response => {
        //console.info(response.data.code+"---123123123--getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          //this.article=response.data.data;
          this.amount=response.data.data;
          console.log(response.data.data);//请求成功，response为成功信息参数
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      })
    },
    getTxList(address){
      this.$api.get('/public/home/txList', {pageNo:this.pageNo,size:20,address:this.address},response => {
        //console.info(response.data.code+"---123123123--getData")
        if (response.data.code >= 20000 && response.data.code < 30000) {
          //this.article=response.data.data;
          this.txList=response.data.data.result;
          this.totalCount=response.data.data.totalCount;
          console.log(response.data.data);//请求成功，response为成功信息参数
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      })
    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

