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
// Fastify comes with an internal json parser, no need for one
app.all('*', (req, res) => res.status(404).send({ message: 'Route not found' }))

// ROUTES
app.register(userRouter)
app.register(taskRouter)
app.register(listRouter)

// SERVER
const PORT = 3000
app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server is running on ${address}`)
})
