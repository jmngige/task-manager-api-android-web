const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next)=>{
    console.log(err.message)

    let error = { ...err }
    error.message = err.message

    //get error response for unavailable resources
    if(err.name === "CastError"){
        const message = `Requested resource not found`
        error = new ErrorResponse(message, 404)
    }

    //get error response for duplicate values
    if(err.code === 11000){
        const message = `Email already exists, please login to your account or try using another email`
        error = new ErrorResponse(message, 400)
    }

    //get error response for validation Errors(empty required fields)
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }


    res.status(error.statusCode | 500).json({
        success: false,
        error: error.message
    })
}


module.exports = errorHandler