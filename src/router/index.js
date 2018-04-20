import Vue from 'vue'
import Router from 'vue-router'

const Local = resolve => require(['@/views/Local'], resolve)
const LocalHelp = resolve => require(['@/views/LocalHelp'], resolve)
const LocalSetting = resolve => require(['@/views/LocalSetting'], resolve)
const Clipboard = resolve => require(['@/views/Clipboard'], resolve)
const ClipboardDetail = resolve => require(['@/views/ClipboardDetail'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Detail = resolve => require(['@/views/Detail'], resolve)
const Test = resolve => require(['@/views/Test'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Local
    },
    {
        path: '/help',
        component: LocalHelp
    },
    {
        path: '/settings',
        component: LocalSetting
    },
    {
        path: '/test',
        component: Test
    },
    {
        path: '/clipboard',
        component: Clipboard
    },
    {
        path: '/clipboards/:id',
        component: ClipboardDetail
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
