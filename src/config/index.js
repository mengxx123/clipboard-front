// let debug = process.env.NODE_ENV !== 'production'

let domain
if (process.env.NODE_ENV === 'production') {
    domain = {
        api: 'https://nodeapi.yunser.com',
        qrcode: 'https://nodeapi.yunser.com',
        // ws: 'wss://nodeapi.yunser.com'
        // ws: 'ws://nodeapi-http.yunser.com'
        ws: 'wss://nodeapi.yunser.com'
    }
} else {
    domain = {
        api: 'http://example.yunser.com',
        qrcode: 'https://nodeapi.yunser.com',
        // ws: 'ws://localhost:1026' // ok
        // ws: 'ws://nodeapi-http.yunser.com' // ok?
        ws: 'wss://nodeapi.yunser.com' // 400
        // ws: 'ws://nodeapi.yunser.com' // 301
        // ws: 'ws://120.78.177.9:1026' // ok
    }
}

module.exports = {
    domain
}
