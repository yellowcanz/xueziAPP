import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Tabs from "@/components/Tabs/Tabs.js";
import "../public/globle.css";
import "mint-ui/lib/style.min.css";
import MintUi from "mint-ui";
import qs from "qs";
import moment from "moment";
moment.locale("zh-cn");
Vue.use(ElementUI);
Vue.use(Tabs);
Vue.use(MintUi);
Vue.prototype.$moment = moment;
Vue.prototype.qs = qs;
Vue.prototype.axios = axios;
axios.defaults.basseURL = "http://127.0.0.1:3000";
// axios.defaults.basseURL = "/api";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
