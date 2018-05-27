<template>
    <my-page title="剪切板 - 设置" :page="page" backable>
    </my-page>
</template>

<script>
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
        },
        destroyed() {
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
</style>
