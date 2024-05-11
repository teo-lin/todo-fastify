const fastify = require('fastify')
const path = require('path')
const userRouter = require('./modules/user/user.controller')
const taskRouter = require('./modules/task/task.controller')
const listRouter = require('./modules/list/list.controller')
const DatabaseService = require('./modules/database/database.service')

// DATABASE
const PATH = path.join(__dirname, './db.json')
DatabaseService.init(PATH)

// ROUTER
const app = fastify()

// MIDDLEWARE
// Fastify comes with an internal json parser

// ROUTES
// app.use('/users', userRouter)
// app.use('/tasks', taskRouter)
// app.use('/lists', listRouter)
// app.get('/', function handler(req, res) {
//   res.send({ hello: 'world' })
// })
// app.register(function (app, opts, done) {
//   app.get('/users', userRouter)
//   // app.route(route)
//   done()
// })
const UserController = require('./modules/user/user.controller')

app.post('/register', UserController.createUser)
app.get('/user/:id', UserController.retrieveUser)
app.put('/user/:id', UserController.updateUser)
app.delete('/user/:id', UserController.deleteUser)

// SERVER
const PORT = 3333
app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server is running on ${address}`)
})
