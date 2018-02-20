<template>
    <my-page title="剪切板">
        <div class="clipboard-box">
            <ui-raised-button primary label="创建剪切板" @click="create" />
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    const uuidUtil = require('uuid')
    console.log(uuidUtil)

    export default {
        data () {
            return {
            }
        },
        mounted() {
            let uuid = this.$storage.get('uuid')
            if (!uuid) {
                uuid = uuidUtil()
                this.$storage.set('uuid', uuid)
            }
            this.uuid = uuid
            this.socket = io.connect('ws://localhost:1333');
            window.$socket = this.socket

			
			this.socket.on('created', id => {
                this.$router.push('/c/' + id)
			})
        },
        methods: {
            create() {
                this.socket.emit('create', this.uuid)
            }
        }
    }
</script>

<style lang="scss" scoped>

.clipboard-box {
    padding-top: 40px;
    text-align: center;
}

</style>
