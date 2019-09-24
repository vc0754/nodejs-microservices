/**
 * 计算服务
 */
const seneca = require('seneca')

var microservice = new seneca()

microservice.use('../plugins/math', { logfile: process.cwd() + '/log/math.log' })

microservice.listen({
  type: 'tcp',
  pin: 'role:math'
})

