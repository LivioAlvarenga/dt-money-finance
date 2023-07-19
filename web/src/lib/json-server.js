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

server.use(router)

server.listen(3333, () => {
  console.log('⚡ JSON Server is running at http://localhost:3333 ⚡')
})
