<template>
    <my-page class="page-detail" title="编辑剪切板" :page="page" backable>
        <div class="editor-box">
                <pre id="code" class="ace_editor" style="height100%; min-height:500px"><textarea class="ace_text-input">
    ## 二级标题
    > 引用

    这是内容
    ### 三级标题
    **加粗**文字
            </textarea></pre>
        </div>
        <!--<ui-text-field v-model="key" hintText="自定义快捷键" />-->
        <br>
        <!--<ui-raised-button label="保存" primary @click="save" />-->
    </my-page>
</template>

<script>
    const ace = window.ace

    export default {
        data () {
            return {
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
            let contents = this.$storage.get('contents', [])
            console.log(contents)
            for (let content of contents) {
                if (content.id === id) {
                    this.content = content
                    this.editor.setValue(content.text)
                    break
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
                this.content.text = this.editor.getValue()
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
            padding: 0;
        }
    }
</style>
