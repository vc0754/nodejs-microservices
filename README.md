# NodeJS Microservices
基于 NodeJS 的微服务框架，使用 Seneca 工具搭建  

本地环境使用 nodemon 进行部署，方便调试时自动重启节点，排查错误
（预）生产环境使用 PM2 进行部署

## 本地部署及调试

### 项目依赖安装
```
npm install
```

### 项目微服务启动
```
npm run service-shop
npm run service-shop-stats
npm run service-math-pin
```

### 项目服务启动
```
npm run dev
```
项目启动会自动创建一项产品，详情可见 console 控制台。

```
创建产品： $-/-/product;id=cecvnd;{name:Banana,price:1.99}
```

通过 HTTP 访问以下地址，配合产品 ID `cecvnd` 进行调试。可在 console 控制台查看对应变化。
```
// Express GET 方法
http://localhost:3000 → { "express": "get '/'" }


// Express Router 路由方法
http://localhost:3000/r → { "express_router": "get '/'" }


// 通过微服务 math 进行操作返回结果
// math 微服务会在项目根目录下会生成 math.log 文件，记录计算过程
http://localhost:3000/api/calculate/sum?left=78&right=33 → { "answer": 111 }


// 通过微服务 shop 进行操作返回结果
http://localhost:3000/api/shop/get?pid=cecvnd → {
  "entity$": "-/-/product",
  "name": "Banana",
  "price": 1.99,
  "id": "cecvnd"
}


// 通过微服务 shop 进行操作返回结果
http://localhost:3000/api/shop/purchase?pid=cecvnd → {
  "entity$": "-/-/purchase",
  "when": 1569300747939,
  "product": "cecvnd",
  "name": "Banana",
  "price": 1.99,
  "id": "4hkdws"
}

```

### 调试


## 生产部署及调试
(...)
