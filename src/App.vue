<template>


  <div id="app">

    <div class="header">
      <div class="module mod-head">
        <div :class="navSearch">

          <div  :style="languageCss">

            <div @click="changelanguage">
               {{languageValue}}
              <i></i>
            </div>

          </div>
          <div :class="cssSearch" style="margin-right: 50px;">

              <input type="text"  v-model="searchName" name="word" value="" :placeholder="$t('home.alt')" autocomplete="off"  style="">
              <button @click="searchRouter" >{{$t("home.search")}}</button>
              <div class="suggestion" style="position: absolute; display: none; top: 28px; left: 0px; width: 248px;"><ul></ul>
              </div>
          </div>

          <div class="logo"><a href="/"><img src="/static/image/public/logo.jpg" alt="ACU Block Browser" width="161" height="42"></a></div>
          <div class="nav">
            <ul>



              <li  style="position: relative;" :class="{'active': routerIndex=='Trade'}">
                <router-link  to="/txs/">{{$t("home.trade")}}</router-link>

              </li>
              <li  style="position: relative;" :class="{'active': routerIndex=='Block'}" >
                <router-link  to="/blocks/">{{$t("home.block")}}</router-link>

              </li>
<!--              <li><router-link to="/tokens/">代币</router-link></li>-->
              <li :class="{'active': routerIndex=='Account'}"  ><router-link to="/accounts/"  >{{$t("home.account")}}</router-link></li>
<!--              <li><router-link to="/qianbao/">钱包</router-link></li>-->



            </ul>


          </div>




          <div class="nav-bar" @click="changeRouter">
            <span @click="closeNav"> </span>
            <span @click="closeNav"></span>
            <span @click="closeNav"></span>
          </div>
          <div class="mask"></div>
        </div>
      </div>


    </div>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import Api from './api/index.js';
Vue.prototype.$api = Api;
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      searchName:'',
      cssSearch:"search",
      navSearch:"inner inner-hide",
      languageValue:'English',
      languageCss:'margin-right: 0px;float: right;margin-top: 20px;font-size: 14px;',
      routerIndex:'',
      languageImage:'static/image/public/usa.png'
    }
  },
  created () {
    var name = localStorage.getItem('languageValue');
    if(name==null){
      this.languageImage="static/image/public/usa.png"
      localStorage.setItem('languageValue', 'en');
      this.$i18n.locale = "en";
    }else{
      this.$i18n.locale = name;
    }

    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    if(flag){
      this.languageCss="margin-right: 0px;float: right;margin-top: 10px;font-size: 14px;";
      //console.log("shouji")
    }
  },
  watch:{
    $route(to,from){
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      if(flag){
        this.navSearch="inner inner-hide ";
        this.cssSearch="search";
      }

     // console.log("---path---"+to.name.toString())

      if(to.path=="/blocks/"||to.name=="blocks"||to.name=="blockInfo"){
       this.routerIndex="Block";
      }
      if(to.path=="/txs/"||to.name=="txsBlock"||to.name=="txsInfo"){
        //console.log("---trade---"+to.path)
        this.routerIndex="Trade";
      }
      if(to.path=="/accounts/"||to.name=="accounts"){

        this.routerIndex="Account";
      }
    }
  },
  methods:{
    closeNav(){

      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      if(flag){

        this.navSearch="";
        this.navSearch="inner inner-hide";
      }
    },

    changeRouter(){
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      if(flag){
        this.navSearch="inner inner-show ";
      }
    },
    searchRouter(){
        if(this.searchName.length>50){
          this.$router.push('/txs/'+this.searchName)
        }else if(this.searchName.length>30&&this.searchName.length<=50){
          if(this.searchName.startsWith("Gs")){
            this.$router.push('/accounts/'+this.searchName)
          }else{
            alert("地址不符合规范");
          }
        }
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      if(flag){
        this.cssSearch="search search-open";
      }

    },
    changelanguage() {
      var name = localStorage.getItem('languageValue');
      if(name==null){
        this.languageImage="static/image/public/usa.png"
        localStorage.setItem('languageValue', 'en');
      }else if(name=="en"){
        name="zh";
        this.languageValue='中文'
        localStorage.setItem('languageValue', 'zh');
      }else if(name=="zh"){
        this.languageValue='English'
        this.languageImage="static/image/public/usa.png"
        localStorage.setItem('languageValue', 'en');
        name="en";
      }


      if (name == "en") {

        this.$i18n.locale = "en";

      }
      if (name == "zh") {

        this.$i18n.locale = "zh";
      }
    }

  }
}
</script>
<style  scoped >


@import './assets/css/common.css';


</style>


