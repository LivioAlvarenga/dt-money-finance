const jsonServer = require('json-server')
const { randomUUID } = require('crypto')
const path = require('path')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, '../../db.json'))
const middlewares = jsonServer.defaults({
  delay: 500,
  watch: true,
})

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
  // middleware to transform the price to cents
  if (req.method === 'GET') {
    const originalSend = res.jsonp
    res.jsonp = function (data) {
      // transform the transactions, if it is an array
      if (Array.isArray(data)) {
        data.forEach((transaction) => {
          transaction.price = Math.round((transaction.price / 100) * 100) / 100 // transform to cents
        })
      }
      // transform the transaction, if it is an object
      else if (typeof data === 'object' && data.price) {
        data.price = Math.round((data.price / 100) * 100) / 100 // transform to cents
      }
      originalSend.call(this, data)
    }
  }

  // middleware to add createdAt, updatedAt and id
  if (req.method === 'POST') {
    req.body.id = randomUUID()
    req.body.createdAt = new Date().toISOString()
    req.body.updatedAt = new Date().toISOString()
    req.body.price = Math.ceil(req.body.price * 100) // transform to cents
  }

  // middleware to add updatedAt
  if (req.method === 'PUT' || req.method === 'PATCH') {
    req.body.updatedAt = new Date().toISOString()
    req.body.price = Math.ceil(req.body.price * 100) // transform to cents
  }
  // Continue to JSON Server router
  next()
})

// Custom routes - to get summary
server.get('/transactions/summary', (req, res) => {
  const transactions = router.db.get('transactions').value()

  const summary = transactions.reduce(
    (acc, transaction) => {
      const priceInCents = Math.round((transaction.price / 100) * 100) / 100 // transform to cents

      if (transaction.type === 'income') {
        acc.income += priceInCents
        acc.total += priceInCents
      } else {
        acc.outcome += priceInCents
        acc.total -= priceInCents
      }

      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )

  res.jsonp(summary)
})

server.get('/transactions/count', (req, res) => {
  const transactions = router.db.get('transactions').value()

  const count = transactions.length
  res.jsonp({ count })
})

server.use(router)

server.listen(3333, () => {
  console.log('⚡ JSON Server is running at http://localhost:3333 ⚡')
})
