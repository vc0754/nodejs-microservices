const express = require('express')
const seneca = require('seneca')
const senecaWeb = require('seneca-web')
const senecaAdapter = require('seneca-web-adapter-express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const router = express.Router()

router.get('/r', (req, res) => {
  console.log(`express router # get '/'`)
  res.json({ express_router: `get '/'` })
})

app.get('/', (req, res) => {
  console.log(`express # get '/'`)
  res.json({ express: `get '/'`})
})

app.use(router)
app.listen(3000, () => {
  console.log('express # listen on 3000')
})

var microservice = new seneca({
  log: {
    // level: 'none'
  }
})
// microservice.quiet()
microservice.use(senecaWeb, {
  context: router,
  adapter: senecaAdapter,
  options: { parseBody: false }
})
microservice.use('entity')
microservice.use('./plugins/api')
microservice.client({
  type: 'tcp',
  pin: 'role:math'
})
microservice.client({
  port: 9002,
  pin: 'role:shop'
})

// create a dummy product
microservice.act({ role: 'shop', add: 'product' }, {
  data: { name: 'Banana', price: 1.99 }
}, function (err, product) {
  console.log(`创建产品： ${product}`)
})
