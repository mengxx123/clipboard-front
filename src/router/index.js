import Vue from 'vue'
import Router from 'vue-router'

const Local = resolve => require(['@/views/Local'], resolve)
const LocalSetting = resolve => require(['@/views/LocalSetting'], resolve)
const Clipboard = resolve => require(['@/views/Clipboard'], resolve)
const ClipboardEdit = resolve => require(['@/views/ClipboardEdit'], resolve)
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
        path: '/add',
        component: ClipboardEdit
    },
    {
        path: '/clipboards/:id',
        component: ClipboardEdit
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
