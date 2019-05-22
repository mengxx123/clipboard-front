import Vue from 'vue'
import App from './App'
import router from './router'
import http from '@/util/http'
import storage from '@/util/storage'
import ui from './components/index'
import './scss/main.scss'
import store from '@/store/index'
import cookie from '@/util/cookie'

Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$storage = storage
Vue.prototype.$cookie = cookie

Vue.use(ui)

let accessToken = cookie.get('accessToken')
if (accessToken) {
    console.log('自动登录')
    http.get('/login/access_token?access_token=' + accessToken).then(
        response => {
            let data = response.data
            storage.set('user', data.user)
            // cookie.set('accessToken', data.accessToken)
            store.state.user = data.user
            store.state.loginState = '' + new Date().getTime()
            // this.redirect()
            // router.go(0)
        },
        response => {
            console.log(response)
            storage.set('user', null)
            cookie.set('accessToken', null)
            store.state.user = null
            store.state.loginState = '' + new Date().getTime()
        })
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
