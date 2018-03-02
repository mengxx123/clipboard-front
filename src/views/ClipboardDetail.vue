<template>
    <my-page title="编辑剪切板" backable>
        <div class="clipboard-box">
            <ui-paper class="editor">
                <textarea class="form-control"  id="textareaCode" name="textareaCode">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;title&gt;云设在线编辑器(yunser.com)&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;这是标题&lt;/h1&gt;
&lt;p&gt;这是段落。&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;</textarea>
            </ui-paper>
            <!--<ui-text-field v-model="key" hintText="自定义快捷键" />-->
            <br>
            <ui-raised-button label="保存" primary @click="save" />
        </div>
    </my-page>
</template>

<script>
    const CodeMirror = window.CodeMirror

    export default {
        data () {
            return {
                content: {}
            }
        },
        mounted() {
            this.editor = CodeMirror.fromTextArea(document.getElementById('textareaCode'), {
                selectionPointer: true,
                lineNumbers: false,
                matchBrackets: true,
                indentUnit: 4,
                indentWithTabs: true
            })

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
.clipboard-box {
    .editor {
        display: block;
        width: 400px;
        max-width: 100%;
        height: 400px;
        margin-bottom: 16px;
        padding: 16px;
    }
}
</style>
