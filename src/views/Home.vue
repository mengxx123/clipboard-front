<template>
    <my-page title="剪切板" :page="page">
        <div class="common-container container">
            <ui-text-field  v-model="content" multiLine :rows="4" :rowsMax="4" hintText="粘贴内容在这里" />
            <div class="btns">
                <ui-raised-button label="保存到剪切板" primary @click="add" />
            </div>

            <div v-if="!contents.length">剪切板里没有内容</div>
            <ul class="content-list">
                <li class="item" v-for="item in contents">
                    <div class="text">
                        <a class="remove" @click.prevent="remove(item)">删除</a>
                        <a class="btn-copy" href="javascript:;" :data-clipboard-text="item.text">复制</a>
                        {{ item.text }}
                    </div>
                </li>
            </ul>
        </div>
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
                            icon: 'apps',
                            href: 'https://app.yunser.com?utm_source=clipboard',
                            target: '_blank',
                            title: '应用'
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
        },
        destroyed() {
            this.clipboard.destroy()
        },
        methods: {
            add() {
                this.contents.unshift({
                    id: '' + new Date().getTime(),
                    text: this.content
                })
                this.$storage.set('contents', this.contents)
                this.content = ''
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
.btns {
    margin-bottom: 16px;
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
