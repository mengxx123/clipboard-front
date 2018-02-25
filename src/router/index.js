import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Clipboard = resolve => require(['@/views/Clipboard'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Detail = resolve => require(['@/views/Detail'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/clipboard',
        component: Clipboard
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/c/:id',
        component: Detail
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
