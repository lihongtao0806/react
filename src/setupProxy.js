const proxy = require('http-proxy-middleware');
module.exports = function (app) {   
    app.use(proxy('/qpvms/api', {
        target: 'http://221.181.88.134:8082/qpvms/api',
        changeOrigin: true,
        pathRewrite: {
            '^/qpvms/api': ''
        }
    }))
}