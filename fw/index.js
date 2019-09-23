const express = require('express')
const seneca = require('seneca')
const senecaWeb = require('seneca-web')
const senecaAdapter = require('seneca-web-adapter-express')
const assert = require('assert')  // NodeJS 断言

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const router = express.Router()

router.get('/r', (req, res) => {
  console.log(`express router # get '/'`)
  res.json(`express router get '/'`)
})    

app.get('/', (req, res) => {
  console.log(`express # get '/'`)
  res.json(`express get '/'`)
})

// app.use(router)
// app.listen(3000, () => {
//   console.log('express # listen on 3000')
// })

var microservice = new seneca({
  log: {
    level: 'none'
  }
})
// microservice.use(senecaWeb, {
//   context: router,
//   adapter: senecaAdapter,
//   options: { parseBody: false }
// })
microservice.use('entity')
microservice.use('shop')
// microservice.use('api')
// microservice.client({ type:'tcp', host: 'localhost', pin:'role:math' })
microservice.client({
  port: 9003,
  pin: 'role:shop,info:purchase'
})

microservice.error(assert.fail)

add_product()

function add_product() {
  microservice.act({ role: 'shop', add: 'product' }, {
    data: {
      name: 'Banana',
      price: 1.99
    }
  }, function( err, save_apple ) {
    console.log(`创建产品： ${save_apple}`)

    this.act({ role: 'shop', get: 'product'}, {
      id: save_apple.id
    }, function( err, load_apple ) {
      console.log(`查询产品： ${load_apple}`)
      
      assert.equal( load_apple.name, save_apple.name )

      do_purchase( load_apple )
    })
  })
}

function do_purchase( apple ) {
  console.log(`购买产品： ${apple}`)

  microservice.act({ role: 'shop', cmd: 'purchase' }, {
    id: apple.id
  }, function (err, purchase) {
    assert.equal( purchase.product, apple.id )
  })
}