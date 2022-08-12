import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/**
 * Ruteo para las vistas.
 */
const routes = [
  {
    path: "/",
    redirect: "/inicio",
    component: () => import("@/views/layout/Layout"),
    children: [
      {
        path: "/inicio",
        name: "inicio",
        component: () => import("@/views/Inicio.vue")
      },
      {
        path: "/proveedores",
        name: "proveedores",
        component: () => import("@/views/TablaProveedores.vue")
      },
    ]
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
