const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/user')

const authRoutes = async (req, res, next)=>{
    let token

    try{

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new ErrorResponse('Please register or login first', 401))
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findById(decoded.id)

    if(!user){
        return next(new ErrorResponse("such user doesn't exist", 400))
    }

    req.user = user
    
    }catch(err){
        return next(new ErrorResponse("Please register or login first", 401))
    }

    next()
}

module.exports = authRoutes