const jsonServer = require('json-server')
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
  if (req.method === 'POST') {
    req.body.createdAt = new Date().toISOString()
  }
  // Continue to JSON Server router
  next()
})

// Custom routes - to get summary
server.get('/summary', (req, res) => {
  const transactions = router.db.get('transactions').value()

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price
        acc.total += transaction.price
      } else {
        acc.outcome += transaction.price
        acc.total -= transaction.price
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

server.use(router)

server.listen(3333, () => {
  console.log('⚡ JSON Server is running at http://localhost:3333 ⚡')
})
