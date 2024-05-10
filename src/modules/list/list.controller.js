const fastify = require('fastify')
const ListService = require('./list.service')

class ListController {
  static async createList(req, res) {
    try {
      const newList = await ListService.createList(req.body)
      res.code(201).send(newList)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static async retrieveList(req, res) {
    try {
      const list = await ListService.retrieveList(req.params.id)
      if (!list) return res.code(404).send({ message: 'List not found' })
      res.send(list)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static async updateList(req, res) {
    try {
      const updatedList = await ListService.updateList(req.params.id, req.body)
      res.send(updatedList)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static async deleteList(req, res) {
    try {
      await ListService.deleteList(req.params.id)
      res.send({ message: 'List deleted successfully' })
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
}

const listRouter = fastify()
listRouter.post('/create', ListController.createList)
listRouter.get('/list/:id', ListController.retrieveList)
listRouter.put('/list/:id', ListController.updateList)
listRouter.delete('/list/:id', ListController.deleteList)

module.exports = listRouter
