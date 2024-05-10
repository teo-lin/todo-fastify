const fastify = require('fastify')
const UserService = require('./user.service')

class UserController {
  static async createUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body)
      res.code(201).send(newUser)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static async retrieveUser(req, res) {
    try {
      const user = await UserService.retrieveUser(req.params.id)
      if (!user) return res.code(404).send({ message: 'User not found' })
      res.send(user)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body)
      res.send(updatedUser)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static async deleteUser(req, res) {
    try {
      await UserService.deleteUser(req.params.id)
      res.send({ message: 'User deleted successfully' })
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
}

const userRouter = fastify()
userRouter.post('/register', UserController.createUser)
userRouter.get('/user/:id', UserController.retrieveUser)
userRouter.put('/user/:id', UserController.updateUser)
userRouter.delete('/user/:id', UserController.deleteUser)

module.exports = userRouter
