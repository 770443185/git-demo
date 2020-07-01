import Vue from "vue";
import VueRouter from "vue-router";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Space from "@/views/Space.vue";
import Article from '@/views/Article.vue'
import Search from '@/views/Search.vue'
Vue.use(VueRouter);
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push=function push(location){
  return routerPush.call(this,location).catch(error=>error)
};
const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/register", component: Register },
    { path: "/login", component: Login },
    { path: "/home", component: Home },
    {
      path :'' , component:Home
    },
    {
      path: "/space",
      component: Space,
      meta: { istoken: true },
    },
    {
      path :'/article/:id',
      component:Article
    },
    {
      path : '/search',
      component : Search
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (
    !sessionStorage.getItem("token") &&
    !sessionStorage.getItem("id") &&
    to.meta.istoken == true
  ) {
    router.push("/login");
    return;
  }
  next();
});
export default router;
