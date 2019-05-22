<template>
    <my-page :title="title">
        <div class="common-container container">
            <ui-tabs :value="activeTab" @change="handleTabChange">
                <ui-tab value="tab1" title="数据"/>
                <ui-tab value="tab2" title="连接"/>
                <ui-tab value="tab3" title="设置"/>
            </ui-tabs>
            <div v-if="activeTab === 'tab1'">
                <div>
                    <textarea class="form-control" v-model="text" rows="4" placeholder="把文本粘贴到这里（最多 3000 字）"></textarea>
                    <div>
                        <ui-raised-button primary label="发送到剪切板" @click="add" :disabled="!text.length" />
                    </div>
                </div>
                <h2 class="section-title">剪切板数据</h2>
                <div class="tip" v-if="!datas.length">剪切板里没有数据</div>
                <ul class="data-list">
                    <li class="item" v-for="item in datas">
                        <div class="text" :title="item.text">{{ item.text }}</div>
                        <a class="item-btn btn-copy" href="javascript:;" :data-clipboard-text="item.text">复制</a>
                        <a class="item-btn btn-copy" href="javascript:;" @click="openUrl(item.text)" v-if="item.type === 'url'">打开链接</a>
                    </li>
                </ul>
            </div>
            <div v-if="activeTab === 'tab2'">
                <h1>剪切板编号：{{ id }}</h1>
                <div class="tip">请在另一台设备的浏览器中打开一下链接</div>
                <div>{{ host }}</div>
                <a class="btn-copy" href="javascript:;" :data-clipboard-text="host">复制</a>
                <div class="tip">也可以用手机的浏览器扫描以下二维码</div>
                <img class="qrcode" :src="src">
            </div>
            <div v-if="activeTab === 'tab3'">
                <ui-checkbox class="checkbox" v-model="encrypt" label="加密传输" />
                <br>
                <ui-text-field class="input" v-model="key" label="密码" v-if="encrypt" />
                <!-- <h1>暂无设置项</h1> -->
            </div>
        </div>
    </my-page>
</template>

<script>
    const Clipboard = window.Clipboard
    const io = window.io
    const uuidUtil = require('uuid')
    const config = require('../config')
    const CryptoJS = window.CryptoJS
    let asd = CryptoJS.AES.encrypt('cjh', '123456').toString()
    asd = CryptoJS.AES.decrypt(asd, '123456').toString(CryptoJS.enc.Utf8)
    console.log('asd', asd)

    export default {
        data () {
            return {
                key: '123456',
                encrypt: false,
                activeTab: 'tab1',
                title: '剪切板',
                id: '',
                host: '',
                src: '',
                text: '',
                datas: [
                    // {
                    //     type: 'text',
                    //     text: '这是什么这是什么这是什么这是什么这是什么这是什么这是什么这是什么这是什么这是什么这是什么这是什么这是什么这是什么这是什么'
                    // },
                    // {
                    //     type: 'text',
                    //     text: '456'
                    // }
                ]
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            handleTabChange (val) {
                this.activeTab = val
            },
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
                    window.$socket = io.connect(config.domain.ws, {
                        transports: ['websocket', 'xhr-polling', 'jsonp-polling']
                    })
                }
                this.socket = window.$socket
                console.log('发送链接')
                this.socket.emit('link', {
                    id: this.id,
                    uuid: uuid
                })
                this.socket.on('text', text => {
                    if (this.encrypt) {
                        text = CryptoJS.AES.decrypt(text, this.key || '123456').toString(CryptoJS.enc.Utf8)
                    }

                    console.log('收到文字' + text)
                    // this.text = text
                    if (text.match('^http')) {
                        this.datas.unshift({
                            type: 'url',
                            text
                        })
                    } else {
                        this.datas.unshift({
                            type: 'text',
                            text
                        })
                    }
                    if (this.activeTab === 'tab2') {
                        this.$message({
                            type: 'success',
                            text: '收到新的剪切板内容'
                        })
                    }
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
                clipboard.on('success', e => {
                    console.info('Action:', e.action)
                    console.info('Text:', e.text)
                    console.info('Trigger:', e.trigger)
                    e.clearSelection()

                    this.$message({
                        type: 'success',
                        text: '已复制'
                    })
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
                let sendText = this.text
                if (this.encrypt) {
                    sendText = CryptoJS.AES.encrypt(sendText, this.key || '123456').toString()
                }

                this.socket.emit('text', {
                    id: this.id,
                    text: sendText
                })
                this.text = ''
            },
            openUrl(url) {
                window.open(url)
            }
        },
        watch: {
            text() {

            }
        }
    }
</script>

<style lang="scss" scoped>
.container {
    max-width: 400px;
}
.qrcode {
    border: 1px solid rgba(0, 0, 0, .12);
}
.tip {
    margin: 16px 0;
    color: #666;
}
.data-list {
    .item {
        padding: 8px 0;
        border-bottom: 1px solid rgba(0, 0, 0, .12);
    }
    .text {
        line-height: 1.6;
        max-height: 3em;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .item-btn {
        margin-right: 16px;
    }
}
textarea.form-control {
    height: auto;
    margin-bottom: 16px;
}
.form-control {
    display: block;
    width: 100%;
    max-width: 400px;
    height: 33px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42;
    color: #55595c;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 2px;
    outline: none;
}
.section-title {
    margin: 16px 0;
    color: #999;
}
</style>
