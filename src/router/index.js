import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Pro from "../views/Pro.vue";
import Cart from "../views/Cart.vue";
import My from "../views/My.vue";
import Detail from "../views/Detail.vue";

import Tabs from "../components/Tabs/Tabs.vue";

Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/detail",
    name: "detail",
    component: Detail,
  },
  {
    path: "/my",
    component: My,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/pro",
    component: Pro,
  },
  {
    path: "/",
    component: Index,
  },
  {
    path: "/tabs",
    component: Tabs,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
