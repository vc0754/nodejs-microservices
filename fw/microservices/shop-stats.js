/**
 * 店铺统计微服务，用于统计销售单品数量
 */
const seneca = require('seneca')

var stats = {}

var microservice = new seneca({
  log: {
    level: 'none'
  }
})

microservice.add({ role: 'shop', info: 'purchase' }, purchase_info)

microservice.listen({
  port: 9003,
  pin: 'role:shop,info:purchase'
})

microservice.ready(() => {
  console.log(`seneca listen on 9003 # role:shop,info:purchase`)
})

function purchase_info (msg, respond) {
  console.log(`购买物品： ${msg.purchase.name}`)
  var product_name = msg.purchase.name
  stats[product_name] = stats[product_name] || 0
  stats[product_name]++
  console.log(stats)
  respond()
}