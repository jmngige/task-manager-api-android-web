const User = require('../models/user')
const saveToken = require('../utils/saveToken')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/asyncError')


//===================== Create user account ============================
exports.createUser = asyncHandler ( async (req, res, next)=>{

    const user = await User.create(req.body)

    saveToken(user, 200, res)
})
//===================== Login user into account ============================
exports.loginUser = asyncHandler (async (req, res, next)=>{
    const {email , password} = req.body

    if(!email || !password){
        return next(new ErrorResponse("Please enter your email and password corretly", 400))
    }

    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorResponse("No account associated with that email found", 404))
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return next(new ErrorResponse("Invalid email or password provided", 400))
    }

    saveToken(user, 200, res)
})

//===================== Login user into account ============================
exports.logoutUser = asyncHandler (async (req, res, next)=>{
    res.cookie('token', 'none', {
        
        expiresIn: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "logged out successfully"
    })
})
