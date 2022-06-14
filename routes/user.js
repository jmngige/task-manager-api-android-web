const express = require('express')
const router = express.Router()

const userRouter = require('../controllers/user')
const auth = require('../middlewares/auth')


//get all users
router.route('/user').get(auth, userRouter.getUsers)

//get user profile
router.route('/user/profile').get(auth, userRouter.getProfile)

//update user profile
router.route('/user/profile').put(auth, userRouter.updateProfile)

//delete user profile
router.route('/user/profile').delete(auth, userRouter.deleteUser)

module.exports = router