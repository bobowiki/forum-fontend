import Vue from "vue"
import VueRouter from "vue-router"

import Login from "@/views/login/Login"
import Home from "@/views/Home"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 代表将要访问的路径
  // from从哪个路径跳转而来
  // next 是一个函数,表示放行
  //  next()放行 next('/login')强制条状
  if (to.path === "/login") return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token")

  if (!tokenStr) return next("/login")
  next()
})

export default router
