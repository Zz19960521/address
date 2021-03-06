// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from "vue";
import App from "./App";
import "./assets/base.less";
import pinyin from 'js-pinyin'

Vue.config.productionTip = false;


new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
