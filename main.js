const jsonServer = require('json-server')
const auth = require('json-server-auth')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})
//Bind the router db to the app
server.db = router.db;

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})
// const rules = auth.rewriter({
//   // Permission rules
//   "api/users": 660,
//   "api/todos": 660,
// });
// server.use(rules)
server.use(auth)

// Use default router
server.use('/api',router)
server.listen(3005, () => {
  console.log('JSON Server is running')
})