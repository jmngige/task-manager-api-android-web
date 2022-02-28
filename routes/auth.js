const express = require('express')
const router = express.Router()

const authRouter = require('../controllers/auth')

//create user router
router.route('/user').post(authRouter.createUser)

//login user router
router.route('/user/login').post(authRouter.loginUser)

//login user router
router.route('/user/logout').post(authRouter.logoutUser)

module.exports = router