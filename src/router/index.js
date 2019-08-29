import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Index from '@/views/Index.vue'
Vue.use(Router);
const IndexRoute = {
  path: '/',
  component: Index,
  children: []
}
export default new Router({
  routes: [
    IndexRoute,
    {
      path: "/home",
      name: "home",
      component: r => require.ensure([],() => r(require('@/views/Home.vue'),'Home'))
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/About.vue")
    }
  ]
});
