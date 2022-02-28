const express = require('express')
const router = express.Router()

const taskRouter = require('../controllers/task')
const auth = require('../middlewares/auth')

//create tasks
router.route('/task').post(auth, taskRouter.createTask)

//get tasks
router.route('/task').get(auth, taskRouter.getTasks)

//get single task
router.route('/task/:id').get(auth, taskRouter.getTask)

//update task
router.route('/task/:id').put(auth, taskRouter.updateTask)

//delete Task
router.route('/task/:id').delete(auth, taskRouter.deleteTask)

module.exports = router