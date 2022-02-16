const express = require('express')
const router = express.Router()

const userRouter = require('../controllers/user')

//create user router
router.route('/user').post(userRouter.createUser)

//get all users
router.route('/user').get(userRouter.getUsers)

//get user profile
router.route('/user/:id').get(userRouter.getProfile)

//update user profile
router.route('/user/:id').put(userRouter.updateProfile)

//delete user profile
router.route('/user/:id').delete(userRouter.deleteUser)

module.exports = router