const fastify = require('fastify')
const TaskService = require('./task.service')

class TaskController {
  static async createTask(req, res) {
    try {
      const newTask = await TaskService.createTask(req.body)
      res.code(201).send(newTask)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static async retrieveTask(req, res) {
    try {
      const task = await TaskService.retrieveTask(req.params.id)
      if (!task) return res.code(404).send({ message: 'Task not found' })
      res.send(task)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static async updateTask(req, res) {
    try {
      const updatedTask = await TaskService.updateTask(req.params.id, req.body)
      res.send(updatedTask)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static async deleteTask(req, res) {
    try {
      await TaskService.deleteTask(req.params.id)
      res.send({ message: 'Task deleted successfully' })
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static async completeTask(req, res) {
    try {
      const taskId = req.params.id
      const task = await TaskService.completeTask(taskId)
      if (!task) return res.code(404).send({ message: 'Task not found' })
      res.send(task)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
}

const taskRouter = fastify()
taskRouter.post('/create', TaskController.createTask)
taskRouter.get('/task/:id', TaskController.retrieveTask)
taskRouter.put('/task/:id', TaskController.updateTask)
taskRouter.delete('/task/:id', TaskController.deleteTask)
taskRouter.patch('/task/:id/complete', TaskController.completeTask)

module.exports = taskRouter
