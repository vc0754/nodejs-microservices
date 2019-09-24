/**
 * 店铺销售统计服务
 */
const seneca = require('seneca')

var microservice = new seneca()

var stats = {}

microservice.add({ role: 'shop', info: 'purchase' }, function (msg, respond) {
  console.log(`购买物品： ${msg.purchase.name}`)
  var product_name = msg.purchase.name
  stats[product_name] = stats[product_name] || 0
  stats[product_name]++
  console.log(stats)
  respond()
})

microservice.listen({
  port: 9003,
  pin: 'role:shop,info:purchase'
})
