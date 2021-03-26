// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from "element-ui";
import axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false
//定义一个将时间戳转换为年月日的全局过滤器
Vue.filter("dateFormat", function (date) {
  var da = new Date(date);
  var year = da.getFullYear();
  var month = da.getMonth() + 1;
  var date = da.getDate();
  var createDate = [year, month, date].join('-');
  return createDate;
})

//定义一个将秒数转化为分钟：秒数的全局过滤器
Vue.filter("timeFormat", function (time) {
  var minute = parseInt(time / 60);
  var second = time % 60;
  second = Math.round(second);
  var minutestr = ('' + minute).padStart(2, '0');
  var secondstr = ('' + second).padStart(2, '0');
  return minutestr + ':' + secondstr;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
