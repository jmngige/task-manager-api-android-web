const express = require('express')
const router = express.Router()

const taskRouter = require('../controllers/task')

//create tasks
router.route('/task').post(taskRouter.createTask)

//get tasks
router.route('/task').get(taskRouter.getTasks)

//get single task
router.route('/task/:id').get(taskRouter.getTask)

//update task
router.route('/task/:id').put(taskRouter.updateTask)

//delete Task
router.route('/task/:id').delete(taskRouter.deleteTask)

module.exports = router