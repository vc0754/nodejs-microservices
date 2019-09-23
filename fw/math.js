var fs = require('fs')

module.exports = function math (options) {
  var log

  this.add({ role: 'math', cmd: 'sum' }, sum)
  this.add({ role: 'math', cmd: 'sum', integer: true }, sumInteger)
  this.add({ role: 'math', cmd: 'product' }, product)
  this.add({ init: 'math' }, init)

  this.wrap({ role: 'math' }, function (msg, respond) {
    msg.left  = Number(msg.left).valueOf()
    msg.right = Number(msg.right).valueOf()
    this.prior(msg, respond)
  })

  function init (msg, respond) {
    fs.open(options.logfile, 'a', function (err, fd) {
      if( err ) return respond(err)
      log = make_log(fd)
      respond()
    })
  }
  
  function sum (msg, respond) {
    var out = { answer: msg.left + msg.right }
    log('sum ' + msg.left + '+' + msg.right + '=' + out.answer + '\n' )
    respond(null, out)
  }
  
  function sumInteger (msg, respond) {
    this.act({ role: 'math' }, {
     cmd: 'sum',
     left: Math.floor(msg.left),
     right: Math.floor(msg.right)
    }, respond)
  }

  function product (msg, respond) {
    var out = { answer: msg.left * msg.right }
    log('product ' + msg.left + '*' + msg.right + '=' + out.answer + '\n' )
    respond(null, out)
  }
  
  function make_log (fd) {
    return function (entry) {
      fs.write(fd, new Date().toISOString() + ' ' + entry, null, 'utf8', function (err) {
        if (err) return console.log(err)
        fs.fsync(fd, function (err) {
          if (err) return console.log(err)
        })
      }) 
    }
  }
  
}