const fastify = require('fastify')
const TaskService = require('./task.service')

class TaskController {
  static createTask(req, res) {
    try {
      const newTask = TaskService.createTask(req.body)
      res.code(201).send(newTask)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static retrieveTask(req, res) {
    try {
      const task = TaskService.retrieveTask(req.params.id)
      if (!task) return res.code(404).send({ message: 'Task not found' })
      res.send(task)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static updateTask(req, res) {
    try {
      const updatedTask = TaskService.updateTask(req.params.id, req.body)
      res.send(updatedTask)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static deleteTask(req, res) {
    try {
      TaskService.deleteTask(req.params.id)
      res.send({ message: 'Task deleted successfully' })
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static completeTask(req, res) {
    try {
      const taskId = req.params.id
      const task = TaskService.completeTask(taskId)
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
