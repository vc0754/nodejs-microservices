/**
 * 店铺服务
 */
const seneca = require('seneca')

var microservice = new seneca()

microservice.use('entity')
microservice.use('../plugins/shop')

microservice.listen({
  port: 9002,
  pin: 'role:shop'
})

microservice.client({
  port: 9003,
  pin: 'role:shop,info:purchase'
})