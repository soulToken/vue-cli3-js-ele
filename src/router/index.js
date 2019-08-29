import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Index from '@/views/Index.vue';
import allRouters from './components/index'
Vue.use(Router);
const IndexRoute = {
  path: '/',
  component: Index,
  children: []
}
IndexRoute.children=[...allRouters];
let first = IndexRoute.children.length>0?IndexRoute.children[0].path:'/login'
IndexRoute.redirect = first;




let router=new Router({
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
router.beforeEach((to, from, next) => {
 /**    
  * 路由拦截
  * 
  */
 console.log(to)
 next()

})
export default  router
