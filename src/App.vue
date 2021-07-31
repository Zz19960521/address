
<template>
  <div class="page ticket-page-cities">
    <my-header class='cities-header' title='通讯录'></my-header>
    <input type="text" v-model="searchText" placeholder="Search...."
      v-on:click="getSearchHistory" v-on:keyup.enter="doSearch">
    <div v-show="showHistory" class="historyDiv">
      <ul>
      <div>搜索历史：</div>
      <li v-for="(item,index) in searchHistoryList" class="licss"
      v-on:click="choose(item)" :key="index" :value="item">{{item}}</li>
    </ul>
    </div>
    <main class="page-content" @scroll='scroll' ref='content'>

      <!-- 右侧导航 -->
      <div class="navs flex flex-v flex-pack-justify">
        <span v-for='(item, index) in navs' :key='item' @click='gotoNav(index)'>{{item}}</span>
      </div>

      <!-- 首字母标签 -->
      <div class="acr" :acr='acr'>
        <div class="acr-list" :style="'transform: translate3d(0,'+(acrIndex * -40)+'px,0);'">
          <div class="item" v-for='(item, index) in labels' :key='index'>{{item}}</div>
        </div>
      </div>

      <!-- 列表 -->
      <div class="tags" v-for='({label, cities}, index) in userList' :key='index'>
        <div class="tag-title">{{label}}</div>
        <ul class="tag-cells">
          <li v-for='(item, index) in cities' :key='index' v-on:click="showDetail">
            {{label}}--{{item}}
          </li>
        </ul>
      </div>
    </main>
    <user-detail v-show="showModal" v-on:closeme="closeme"></user-detail>
  </div>
</template>

<script>
/* eslint-disable */
import MyHeader from "@/components/MyHeader.vue";
import UserDetail from "@/components/UserDetail.vue";
export default {
  components: {
    MyHeader,
    UserDetail
  },
  mounted() {
    let pinyin = require('js-pinyin');
    pinyin.setOptions({checkPolyphone: false, charCase: 0});
    console.log(pinyin.getFullChars('管理员'));
    this.getuserList()
    this.$nextTick(() => {
      this.offset = this.initOffsetTop();
      this.body = this.$refs.content;
      let offsetCalc = this.offset.slice();
      offsetCalc.forEach((item, index) => {
        this.offsetList.push([item, offsetCalc[index + 1]]);
      });
    });
  },
  methods: {
    showDetail(v){
      console.log(1)
      this.showModal = true
    },
    closeme(){
      this.showModal = false
    },
    scroll(evt) {
      const offsetTop = this.body.scrollTop;
      const label = this.getArea(offsetTop);
      if (label !== this.acr) {
        this.acr = label;
      }
    },
    getArea(number) {
      // 判断所处区间
      let label = "";
      number += 80;
      for (let i = 0, size = this.offsetList.length; i < size; i++) {
        let [start, end] = this.offsetList[i];
        if (number >= start && number < (end || 999999)) {
          label = this.labels[i];
          this.acrIndex = i;
          break;
        }
      }
      return label;
    },
    gotoNav(index) {
      const offset = this.offset[index];
      this.body.scrollTop = offset;
    },
    initOffsetTop() {
      const cells = [...document.querySelectorAll(".tags")];
      const offset = [];
      cells.forEach(item => {
        offset.push(item.offsetTop || 0);
      });
      return offset;
    },
    clean() {
      this.inputValue = "";
    },
    submit() {},
    makeWords() {
      return "abcdefghijklmnopqrstuvwxyz".split("").map(i => i.toUpperCase());
    },
    getuserList(){
      this.userList = this.makeWords().map(item => {
          return {
            label: item,
            cities: ["张三", "李四", "王二", "王富贵", "刘少喜", "秦娇娇", "何聪"]
          };
        })
      this.userListCopy = this.userList
    },
    getSearchHistory(){
      this.showHistory = true
      this.searchHistoryList = JSON.parse(localStorage.getItem('searchHistory')) || []
    },
    choose(v){
      this.searchText = v;
      this.doSearch()
      this.showHistory = false
    },
    doSearch(){
      let p = []
      p = JSON.parse(localStorage.getItem('searchHistory')) || []
      if(!p.includes(this.searchText)){
        p.push(this.searchText)
      }
      localStorage.setItem('searchHistory',JSON.stringify(p))
      console.log(localStorage.getItem('searchHistory'))
      this.userList = this.userListCopy
      const searchtext = this.searchText
      const templist1 = JSON.parse(JSON.stringify(this.userList)) 
      const templist2 = JSON.parse(JSON.stringify(this.userList)) 
      const list1 = templist1.map(item => {
        item.cities = item.cities.filter(itemx => {
          return itemx.indexOf(searchtext)>-1
        })
        return item
      })

      const list2= templist2.filter(item => {
          return item.label.indexOf(searchtext)>-1
      })
      this.userList = this.unique(list1,list2)
      console.log(this.unique(list1,list2))
      this.showHistory = false
      
    },
    unique(arr1,arr2) { // 根据唯一标识no来对数组进行过滤
      if(arr2.length>0){
        arr1 = arr1.map(item => {
          if(item.label == arr2[0].label) {
            item.cities = arr2[0].cities
            return item
          } else{
            return item
          }
        })
        arr1 = arr1.filter(item => {
          return item.cities.length>0
        })
        return arr1
      } else {
        arr1 = arr1.filter(item => {
          return item.cities.length>0
        })
        return arr1
      }
    }
  },
  data() {
    return {
      acr: "",
      acrIndex: -1,
      inputValue: "",
      offset: [],
      offsetList: [],
      searchText:'',
      showModal:false,
      labels: this.makeWords(),
      body: null,
      userList:[],
      userListCopy:[],
      navs: this.makeWords(),
      searchHistoryList:[],
      showHistory:false,
    };
  }
};
</script>

<style lang='less'>
.ticket-page-cities {
  .head {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    color: #999;
    font-size: 12px;
  }
  .acr {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 40px;
    /* background: #f4f4f4; */
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    .acr-list {
      position: absolute;
      transform: translate3d(0, 0, 0);
      transition: transform 0.5s;
    }
    .item {
      .head;
    }
    &[acr=""] {
      display: none;
    }
  }
  .tag-title {
    .head;
  }
  .tag-cells {
    background: #fff;
    li {
      margin-left: 10px;
      padding: 11px 0;
      border-bottom: 1px solid #eee;
      font-size: 15px;
      color: #333;
      cursor: pointer;
      &:last-child {
        border: 0;
      }
    }
  }
  @media only screen and (min-width: 720px) {
    .navs {
      right: auto;
      left: 50%;
      margin-left: 225px;
    }
  }
  .navs {
    z-index: 2;
    position: fixed;
    right: 10px;
    top: 50px;
    bottom: 30px;
    text-align: center;
    color: #5d9ed3;
    font-size: 10px;
    span {
      cursor: pointer;
    }
  }
  .licss {
    width:100%;
    border:1px solid #eee;
    background-color: #fff;
    z-index: 9999;
  }
  .historyDiv{
    float:left;
    position:absolute;
    top:60px;
    width:90%;
    z-index:999;
    background-color: #fff;
  }
}
</style>
