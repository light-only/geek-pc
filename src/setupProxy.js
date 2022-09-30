

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api',{
            target: 'http://geek.itheima.net/v1_0',
            changeOrigin: true,
            pathRewrite:{
                '^/api':''
            }
        })
    );
};