const fastify = require('fastify')
const fs = require('fs')
const path = require('path')

// CONTROLLERS
class UserController {
  static createUser(req, res) {
    try {
      const newUser = UserService.createUser(req.body)
      res.code(201).send(newUser)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static retrieveUser(req, res) {
    try {
      const user = UserService.retrieveUser(req.params.id)
      if (!user) return res.code(404).send({ message: 'User not found' })
      res.send(user)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static updateUser(req, res) {
    try {
      const updatedUser = UserService.updateUser(req.params.id, req.body)
      res.send(updatedUser)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static deleteUser(req, res) {
    try {
      UserService.deleteUser(req.params.id)
      res.send({ message: 'User deleted successfully' })
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
}
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
class ListController {
  static createList(req, res) {
    try {
      const newList = ListService.createList(req.body)
      res.code(201).send(newList)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static retrieveList(req, res) {
    try {
      const list = ListService.retrieveList(req.params.id)
      if (!list) return res.code(404).send({ message: 'List not found' })
      res.send(list)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static updateList(req, res) {
    try {
      const updatedList = ListService.updateList(req.params.id, req.body)
      res.send(updatedList)
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
  static deleteList(req, res) {
    try {
      ListService.deleteList(req.params.id)
      res.send({ message: 'List deleted successfully' })
    } catch (error) {
      res.code(500).send({ message: error.message })
    }
  }
}

// SERVICES
class UserService {
  static createUser(userData) {
    const data = DatabaseService.getData()
    const nextUserId = `U${1 + Number(data.lastUserId.slice(1))}`
    const newUser = { userId: nextUserId, ...userData }
    data.users.push(newUser)
    data.lastUserId = nextUserId
    DatabaseService.setData(data)
    delete newUser.password
    return newUser
  }
  static retrieveUser(userId) {
    const data = DatabaseService.getData()
    const user = data.users.find((user) => user.userId === userId)
    delete user.password
    return user
  }
  static updateUser(userId, userData) {
    const data = DatabaseService.getData()
    const userIndex = data.users.findIndex((user) => user.userId === userId)
    if (userIndex === -1) throw new Error('User not found')
    data.users[userIndex] = { ...data.users[userIndex], ...userData }
    DatabaseService.setData(data)
    const user = data.users[userIndex]
    delete user.password
    return user
  }
  static deleteUser(userId) {
    const data = DatabaseService.getData()
    data.users = data.users.filter((user) => user.userId !== userId)
    DatabaseService.setData(data)
  }
}
class ListService {
  static createList(listData) {
    const data = DatabaseService.getData()
    const nextListId = `L${1 + Number(data.lastListId.slice(1))}`
    const newList = { listId: nextListId, ...listData }
    data.lists.push(newList)
    data.lastListId = nextListId
    DatabaseService.setData(data)
    return newList
  }
  static retrieveList(listId) {
    const data = DatabaseService.getData()
    return data.lists.find((list) => list.listId === listId)
  }
  static updateList(listId, listData) {
    const data = DatabaseService.getData()
    const listIndex = data.lists.findIndex((list) => list.listId === listId)
    if (listIndex === -1) throw new Error('List not found')
    data.lists[listIndex] = { ...data.lists[listIndex], ...listData }
    DatabaseService.setData(data)
    return data.lists[listIndex]
  }
  static deleteList(listId) {
    const data = DatabaseService.getData()
    data.lists = data.lists.filter((list) => list.listId !== listId)
    DatabaseService.setData(data)
  }
}
class TaskService {
  static createTask(taskData) {
    const data = DatabaseService.getData()
    const nextTaskId = `T${1 + Number(data.lastTaskId.slice(1))}`
    const newTask = { taskId: nextTaskId, ...taskData }
    data.tasks.push(newTask)
    data.lastTaskId = nextTaskId
    DatabaseService.setData(data)
    return newTask
  }
  static retrieveTask(taskId) {
    const data = DatabaseService.getData()
    return data.tasks.find((task) => task.taskId === taskId)
  }
  static updateTask(taskId, taskData) {
    const data = DatabaseService.getData()
    const taskIndex = data.tasks.findIndex((task) => task.taskId === taskId)
    if (taskIndex === -1) throw new Error('Task not found')
    data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...taskData }
    DatabaseService.setData(data)
    return data.tasks[taskIndex]
  }
  static deleteTask(taskId) {
    const data = DatabaseService.getData()
    data.tasks = data.tasks.filter((task) => task.taskId !== taskId)
    DatabaseService.setData(data)
  }
  static completeTask(taskId) {
    const data = DatabaseService.getData()
    const taskIndex = data.tasks.findIndex((task) => task.taskId === taskId)
    if (taskIndex === -1) throw new Error('Task not found')
    data.tasks[taskIndex].isComplete = true
    DatabaseService.setData(data)
    return data.tasks[taskIndex]
  }
}

class DatabaseService {
  static #db

  static init(filePath) {
    this.#db = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  }

  static getData() {
    return this.#db
  }

  static setData(data) {
    this.#db = data
  }

  static saveToDisk(filePath) {
    fs.writeFileSync(filePath, JSON.stringify(this.#db), 'utf8')
  }
}

// DATABASE
const PATH = path.join(__dirname, './db.json')
DatabaseService.init(PATH)

// ROUTER
const app = fastify()

// MIDDLEWARE
// Fastify comes with an internal json parser, no need for one
app.all('*', (req, res) => res.status(404).send({ message: 'Route not found' }))

// ROUTES
app.post('/users/register', UserController.createUser)
app.get('/users/user/:id', UserController.retrieveUser)
app.put('/users/user/:id', UserController.updateUser)
app.delete('/users/user/:id', UserController.deleteUser)
app.post('/tasks/create', TaskController.createTask)
app.get('/tasks/task/:id', TaskController.retrieveTask)
app.put('/tasks/task/:id', TaskController.updateTask)
app.delete('/tasks/task/:id', TaskController.deleteTask)
app.patch('/tasks/task/:id/complete', TaskController.completeTask)
app.post('/lists/create', ListController.createList)
app.get('/lists/list/:id', ListController.retrieveList)
app.put('/lists/list/:id', ListController.updateList)
app.delete('/lists/list/:id', ListController.deleteList)

// SERVER
const PORT = 3000
app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err
  console.log(`Server is running on ${address}`)
})
