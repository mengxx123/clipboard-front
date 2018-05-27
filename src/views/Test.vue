<template>
    <my-page title="测试" :page="page">
        <span class="fq-copy">
            复制
        </span>

                <span class="layui-layer-content">
        <img class='' src='https://www.baidu.com/img/bd_logo1.png' style='width:50px;'><br/>描述文字~
        </span>
    </my-page>
</template>

<script>
    /* eslint-disable */
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
            let clipboard = new Clipboard('.fq-copy', {
                target: function () {
                    return document.querySelector('.layui-layer-content');
                }
            })
        },
        destroyed() {
        },
        methods: {
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
            width: 200px;
            word-wrap: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

</style>
