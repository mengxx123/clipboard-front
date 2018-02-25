<template>
    <my-page :title="title">
        <h1>剪切板编号：{{ id }}</h1>
        <div>
            请在另一台设备的浏览器中打开 {{ host }} 
            <a class="btn-copy" href="#" :data-clipboard-text="host">复制</a>
            <div>也可以用手机的浏览器扫描以下二维码</div>
            <img :src="src">

            <div>
                <h2>剪切板</h2>
                <textarea v-model="text" placeholder="把文本粘贴到这里（最多 3000 字）"></textarea>
                <div>
                    <ui-raised-button primary label="添加到剪切板" @click="add" :disabled="!text.length" />
                </div>
            </div>
        </div>
    </my-page>
</template>

<script>
    const Clipboard = window.Clipboard
    const io = window.io
    const uuidUtil = require('uuid')
    const config = require('../config')

    export default {
        data () {
            return {
                title: '剪切板',
                id: '',
                host: '',
                src: '',
                text: ''
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.id = this.$route.params.id
                this.title = '剪切板 ' + this.id
                this.host = location.href
                this.src = config.domain.qrcode + '/qrcode?content=' + this.host
                console.log(location)
                console.log(this.id)

                this.initClipboard()

                // TODO 重构
                let uuid = this.$storage.get('uuid')
                if (!uuid) {
                    uuid = uuidUtil()
                    this.$storage.set('uuid', uuid)
                }
                if (!window.$socket) {
                    window.$socket = io.connect(config.domain.ws)
                }
                this.socket = window.$socket
                console.log('发送链接')
                this.socket.emit('link', {
                    id: this.id,
                    uuid: uuid
                })
                this.socket.on('text', text => {
                    console.log('收到文字' + text)
                    this.text = text
                })
                console.log('链接完成')
                // this.$http.get('/version').then(
                //     response => {
                //         let data = response.data
                //         if (data.code === 200) {
                //             console.log(data)
                //             this.version = data.data
                //         }
                //     },
                //     response => {
                //         console.log(response)
                //     })
            },
            initClipboard() {
                // TODO destroyed
                let clipboard = new Clipboard('.btn-copy')
                clipboard.on('success', function (e) {
                    console.info('Action:', e.action)
                    console.info('Text:', e.text)
                    console.info('Trigger:', e.trigger)
                    e.clearSelection()
                })
                clipboard.on('error', function (e) {
                    console.error('Action:', e.action)
                    console.error('Trigger:', e.trigger)
                })
            },
            add() {
                if (this.text.length > 3000) {
                    alert('不能超过 3000 字')
                    return
                }
                console.log(window.$socket)
                this.socket.emit('text', {
                    id: this.id,
                    text: this.text
                })
            }
        },
        watch: {
            text() {

            }
        }
    }
</script>

<style scoped>
</style>
