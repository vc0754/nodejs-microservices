/**
 * API 接口插件
 */
module.exports = function api (options) {
  
  this.add({ role: 'api', path: 'calculate' }, function (msg, respond) {
    var valid_ops = { sum: 'sum', product: 'product' }

    var operation = msg.args.params.operation
    var left = msg.args.query.left
    var right = msg.args.query.right
    
    this.act({ role: 'math' }, {
      cmd: valid_ops[operation],
      left,
      right
    }, respond)
  })

  this.add({ role: 'api', path: 'shop' }, function (msg, respond) {
    var id = null
    if (msg.args.query.pid) {
      id = msg.args.query.pid
    }
    if (msg.args.body.pid) {
      id = msg.args.body.pid
    }

    var operation = msg.args.params.operation

    var shopmsg = { role:'shop', id:id }

    if ('get'      == operation) shopmsg.get = 'product'
    if ('purchase' == operation) shopmsg.cmd = 'purchase'

    this.act(shopmsg, respond)
  })

  this.add({ init: 'api' }, function (msg, respond) {
    this.act({ role: 'web' }, {
      routes: {
        prefix: '/api',
        pin: 'role:api,path:*',
        map: {
          calculate: { GET: true, suffix: '/:operation' }
        }
      }
    })

    this.act({ role: 'web' }, {
      routes: {
        prefix: '/api',
        pin: 'role:api,path:*',
        map: {
          shop: { GET: true, POST: true, suffix: '/:operation' },
        }
      }
    })

    respond()
  })
  
}
