# NodeJS Microservices
基于 NodeJS 的微服务框架
使用 Seneca 工具搭建
使用 PM2 进行生产部署

### npm run dev
该命令使用 nodemon 进行开发部署，方便调试时自动重启节点，排查错误

### 在浏览器中访问以下两组地址，获取结果

http://localhost:3000/api/calculate/sum?left=2&right=3 → {"answer":5}

http://localhost:3000/api/calculate/product?left=2&right=3 → {"answer":6}

根目录下会生成 math.log 文件，记录计算访问的过程

### npm run start
该命令使用 pm2 进行生产部署