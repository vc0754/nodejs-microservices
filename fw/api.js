module.exports = function api (options) {
  var valid_ops = { sum: 'sum', product: 'product' }

  this.add({ role: 'api', path: 'calculate' }, calculate)
  this.add({ init: 'api' }, init)

  function init (msg, respond) {
    this.act({ role: 'web' }, {
      routes: {
        prefix: '/api',
        pin: 'role:api,path:*',
        map: {
          calculate: { GET: true, suffix: '/:operation' }
        }
      }
    }, respond)
  }

  function calculate (msg, respond) {
    var operation = msg.args.params.operation
    var left = msg.args.query.left
    var right = msg.args.query.right
    
    this.use('math', { logfile:'./log/math.log' }).act({ role: 'math' }, {
      cmd: valid_ops[operation], left, right
    }, respond)
  }

}