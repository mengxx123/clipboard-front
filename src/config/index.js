// let debug = process.env.NODE_ENV !== 'production'

let domain
if (process.env.NODE_ENV === 'production') {
    domain = {
        api: 'http://example.yunser.com',
        qrcode: 'http://node.api.yunser.com',
        ws: 'ws://api.clipboard.yunser.com/'
    }
} else {
    domain = {
        api: 'http://example.yunser.com',
        qrcode: 'http://node.api.yunser.com',
        // ws: 'ws://localhost:1333'
        ws: 'ws://api.clipboard.yunser.com'
    }
}

module.exports = {
    domain
}
