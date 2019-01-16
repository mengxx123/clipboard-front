<template>
    <my-page title="剪切板 - 高级">
        <div class="clipboard-box" v-if="mode === 'create'">
            <ui-raised-button class="create" primary label="创建剪切板" @click="create" />
            <br>
            <a class="btn-copy" href="javascript:;" @click="mode = 'code'">已经创建了</a>
        </div>
        <div class="clipboard-box" v-if="mode === 'code'">
            <ui-text-field class="input" v-model="code" label="剪切板编号" />
            <br>
            <ui-raised-button class="enter" primary label="进入剪切板" @click="enter" />
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    const uuidUtil = require('uuid')
    console.log(uuidUtil)
    const config = require('../config')

    export default {
        data () {
            return {
                mode: 'create'
            }
        },
        mounted() {
            let uuid = this.$storage.get('uuid')
            if (!uuid) {
                uuid = uuidUtil()
                this.$storage.set('uuid', uuid)
            }
            this.uuid = uuid
            this.socket = io.connect(config.domain.ws, {transports:['websocket','xhr-polling','jsonp-polling']});
            window.$socket = this.socket

			this.socket.on('created', id => {
                this.$router.push('/c/' + id)
			})
        },
        methods: {
            create() {
                this.socket.emit('create', this.uuid)
            },
            enter() {
                if (!this.code) {
                    this.$message({
                        type: 'danger',
                        text: '请输入剪切板编号'
                    })
                    return
                }
                this.$router.push('/c/' + this.code)
            }
        }
    }
</script>

<style lang="scss" scoped>

.clipboard-box {
    padding-top: 40px;
    text-align: center;
    .create {
        margin: 16px 0;
    }
    .input {
        margin-top: 16px;
    }
}

</style>
