// let debug = process.env.NODE_ENV !== 'production'

let domain
if (process.env.NODE_ENV === 'production') {
    domain = {
        api: 'https://nodeapi.yunser.com',
        qrcode: 'https://nodeapi.yunser.com',
        ws: 'wss://nodeapi.yunser.com/clipboard'
    }
} else {
    domain = {
        api: 'http://localhost:1026',
        qrcode: 'https://nodeapi.yunser.com',
        ws: 'wss://nodeapi.yunser.com/clipboard'
        // ws: 'ws://localhost:1026/clipboard' // 400
    }
}

module.exports = {
    domain
}
