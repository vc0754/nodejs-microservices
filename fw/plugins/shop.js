/**
 * 店铺插件
 */

module.exports = function ( options ) {
  
  this.add({ role: 'shop', get: 'product' }, get_product)
  this.add({ role: 'shop', add: 'product' }, add_product)
  this.add({ role: 'shop', cmd: 'purchase' }, purchase)
  
  function get_product (msg, respond) {
    this.make('product').load$(msg.id, respond)
  }
  
  function add_product (msg, respond) {
    this.make('product').data$(msg.data).save$(respond)
  }

  function purchase (msg, respond) {
    this.make('product').load$({ id: msg.id }, function (err, product) {
      if (err) return respond(err)

      this.make('purchase').data$({
        when:    Date.now(),
        product: product.id,
        name:    product.name,
        price:   product.price,
      }).save$(function (err, purchase) {
        if (err) return respond(err)
        
        console.log(`订单详情： ${purchase}`)

        // to shop-stats.js
        this.act({ role: 'shop', info: 'purchase' }, { purchase: { name: purchase.name } })
        respond(null, purchase)
      })
    })
  }
}
