const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const router = require('./route');
const cors = require('cors');

const app = express();
// 创建反向代理中间件
const apiProxy = createProxyMiddleware('/api', {
    target: 'http://localhost:3000',  // 目标服务器的URL
    changeOrigin: true,  // 修改请求的原始地址为目标URL
    // 可选的其他配置项
});
const settings = {
    port: '8080',
};

// 使用body-parser中间件来解析请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 应用反向代理中间件
app.use(apiProxy);

// 使用CORS中间件来处理跨域请求
app.use(cors());

// 路由

app.use('/api', router);

// // 定义API路由
// app.get('/api/hello', (req, res) => {
//     res.json({ message: 'Hello from Express!' });
// });

// 捕获所有未处理的路由，返回React应用的HTML文件
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// 启动Express服务器
app.listen(settings.port, () => {
    console.log(`Server listening on port ${settings.port}`);
});