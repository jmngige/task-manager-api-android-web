const User = require('../models/user')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/asyncError')


//===================== Get all users ============================
exports.getUsers = asyncHandler (async (req, res, next)=>{
    const users = await User.find()

    if(!users){
        return next(new ErrorResponse("No users found at the moment", 404))
    }

    res.status(200).json({
        success: true,
        count: users.length,
        users
    })
})

//===================== get user profile ============================
exports.getProfile = asyncHandler (async (req, res, next)=>{

    const user = await User.findById(req.user.id)

    if(!user){
        return next(new ErrorResponse("User profile not found", 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//===================== update user profile ============================
exports.updateProfile = asyncHandler (async (req, res, next)=>{
    let user = await User.findById(req.user.id)

    if(!user){
        return next(new ErrorResponse("User profile not found", 404))
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user
    })
})

//===================== delete user profile ============================
//========== To delete files associated with a user check the user model file ====
exports.deleteUser = asyncHandler (async (req, res, next)=>{
    let user = await User.findById(req.user.id)

    if(!user){
        return next(new ErrorResponse("User profile not found", 404))
    }

    user = await User.findByIdAndDelete(req.user.id)

    res.cookie('token', 'none', {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success:true,
        message: "User profile deleted successfully"
    })
})