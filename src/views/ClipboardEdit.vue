<template>
    <my-page class="page-detail" title="编辑剪切板" :page="page" backable>
        <div class="common-container container">
            <ui-text-field  v-model="content.title" hintText="标题（可选）" />
            <br>
            <div class="editor-box">
                    <pre id="code" class="ace_editor" style="height100%; min-height:500px"><textarea class="ace_text-input"></textarea></pre>
            </div>
            <!--<ui-text-field v-model="key" hintText="自定义快捷键" />-->
            <br>
            <!--<ui-raised-button label="保存" primary @click="save" />-->
        </div>
    </my-page>
</template>

<script>
    const ace = window.ace

    export default {
        data () {
            return {
                isAdd: null,
                title: '',
                content: {},
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'check',
                            click: this.save,
                            title: '保存'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.initEditor()
            let id = this.$route.params.id
            this.isAdd = !id
            if (!this.isAdd) {
                if (this.$store.state.user) {
                    this.$http.get(`/clipboard/datas/${id}`).then(
                        response => {
                            let data = response.data
                            console.log(data)
                            this.content = data
                            this.editor.setValue(this.content.content)
                        },
                        response => {
                            console.log(response)
                            this.loading = false
                        })
                } else {
                    let contents = this.$storage.get('contents', [])
                    console.log(contents)
                    for (let content of contents) {
                        if (content.id === id) {
                            this.content = content
                            this.editor.setValue(content.content)
                            break
                        }
                    }
                }
            }
        },
        methods: {
            initEditor() {
                this.editor = ace.edit('code')
                this.editor.setFontSize(16)
                this.editor.setOption('wrap', 'free') // 自动换行,设置为off关闭
            },
            save() {
                let inputText = this.editor.getValue()
                if (!inputText) {
                    this.$message({
                        type: 'danger',
                        text: '请输入内容'
                    })
                    return
                }
                // if (!this.content.title) {

                // }

                if (this.isAdd) {
                    if (this.$store.state.user) {
                        this.content.content = this.editor.getValue()
                        console.log('save is', this.content)
                        this.$http.post(`/clipboard/datas`, {
                            title: this.content.title || inputText,
                            content: inputText,
                        }).then(
                            response => {
                                let data = response.data
                                console.log(data)
                                this.$router.go(-1)
                            },
                            response => {
                                console.log(response)
                                this.loading = false
                            })
                    } else {
                        let contents = this.$storage.get('contents', [])
                        this.content.content = this.editor.getValue()
                        contents.unshift({
                            id: '' + new Date().getTime(),
                            title: this.content.title,
                            content: this.content.content
                        })
                        // this.$storage.set('contents', this.contents)
                        // this.content = ''
                        console.log('啦啦啦', contents)
                        this.$storage.set('contents', contents)
                        this.$router.go(-1)
                    }
                } else {
                    if (this.$store.state.user) {
                        this.$http.put(`/clipboard/datas/${this.content.id}`, {
                            title: this.content.title || inputText,
                            content: inputText,
                        }).then(
                            response => {
                                let data = response.data
                                console.log(data)
                                this.$router.go(-1)
                            },
                            response => {
                                console.log(response)
                                this.loading = false
                            })
                    } else {
                        this.content.content = this.editor.getValue()
                        let contents = this.$storage.get('contents', [])
                        for (let i = 0; i < contents.length; i++) {
                            if (contents[i].id === this.content.id) {
                                contents.splice(i, 1, this.content)
                                break
                            }
                        }
                        this.$storage.set('contents', contents)
                        this.$router.go(-1)
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .editor-box {
        display: block;
        width: 100%;
        max-width: 800px;
        height: 100%;
        /*margin-bottom: 16px;*/
        /*padding: 16px;*/
        box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    }
</style>

<style lang="scss">
    .page-detail {
        .ui-page-container {
            height: 100%;
            padding: 16px;
        }
    }
</style>
