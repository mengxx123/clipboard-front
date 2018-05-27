<template>
    <my-page title="剪切板" :page="page">
        <ui-text-field  v-model="content" multiLine :rows="4" :rowsMax="4" hintText="粘贴内容在这里" />
        <div class="btns">
            <ui-raised-button label="保存到剪切板" primary @click="add" />
        </div>
        <div v-if="!contents.length">剪切板里没有内容</div>
        <ul class="content-list">
            <li class="item" v-for="(item, index) in contents">
                <div class="text">
                    <kbd>{{ index + 1 }}</kbd>
                    <a class="remove" href="#" @click.prevent="remove(item)">删除</a>
                    <router-link :to="'/clipboards/' + item.id">编辑</router-link>
                    <a class="btn-copy" href="javascript:;" :data-clipboard-text="item.text">复制</a>
                    {{ item.text }}
                </div>
            </li>
        </ul>
        <button id="auto-copy" class="btn-copy-2" data-clipboard-text="item.text2" style="display: none">呵呵</button>
    </my-page>
</template>

<script>
    const Clipboard = window.Clipboard

    export default {
        data () {
            return {
                content: '',
                contents: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/help'
                        }
                    ]
                }
            }
        },
        mounted() {
            // TODO 剪切板应用容易储存满
            this.contents = this.$storage.get('contents', [])

            this.clipboard = new Clipboard('.btn-copy')
            this.clipboard.on('success', function (e) {
                console.info('Action:', e.action)
                console.info('Text:', e.text)
                console.info('Trigger:', e.trigger)
                e.clearSelection()
            })
            this.clipboard.on('error', function (e) {
                console.error('Action:', e.action)
                console.error('Trigger:', e.trigger)
            })

            this.clipboard2 = new Clipboard('.btn-copy-2', {
                text: trigger => {
                    return this.contents[this.keyNum].text
                }
            })
            this.clipboard2.on('success', e => {
                console.info('Action:', e.action)
                console.info('Text:', e.text)
                console.info('Trigger:', e.trigger)
                e.clearSelection()
            })

            document.addEventListener('keydown', this.onKeydown)
            this.initWebIntents()
        },
        destroyed() {
            document.removeEventListener('keydown', this.onKeydown)
            this.clipboard.destroy()
            this.clipboard2.destroy()
        },
        methods: {
            initWebIntents() {
                if (!window.intent) {
                    return
                }
                let data = window.intent.data
                this.content = data
            },
            copy() {
                document.getElementById('auto-copy').click()
            },
            onKeydown(e) {
                if (document.activeElement.tagName !== 'TEXTAREA') {
                    this.keyNum = e.keyCode - 49
                    document.getElementById('auto-copy').click(e)
                }
            },
            add() {
                this.contents.unshift({
                    id: '' + new Date().getTime(),
                    text: this.content
                })
                this.$storage.set('contents', this.contents)
                this.content = ''
            },
            edit() {
//                this.$router.push('')
            },
            remove(item) {
                for (let i = 0; i < this.contents.length; i++) {
                    if (this.contents[i].id === item.id) {
                        this.contents.splice(i, 1)
                        break
                    }
                }
                this.$storage.set('contents', this.contents)
            }
        }
    }
</script>

<style lang="scss" scoped>
    kbd {
        display: inline-block;
        margin: 0 .1em;
        padding: .1em .6em;
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-size: 11px;
        line-height: 1.4;
        color: #242729;
        text-shadow: 0 1px 0 #FFF;
        background-color: #e1e3e5;
        border: 1px solid #adb3b9;
        border-radius: 3px;
        box-shadow: 0 1px 0 rgba(12, 13, 14, 0.2), 0 0 0 2px #FFF inset;
        white-space: nowrap;
    }
    kbd {
        margin-right: 8px;
    }
    .btns {
        margin-bottom: 24px;
    }
    .content-list {
        .item {
            margin-bottom: 16px;
        }
        .text {
            display: inline-block;
            width: 400px;
            max-width: 100%;
            word-wrap: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

</style>
