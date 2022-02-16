const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    
    fullName: {
        type: String,
        required: [true, "Please make sure you add your name"],
    },
    email: {
      type: String,
      lowercase: true,
      required:[true, "Please ensure you add your email addressss"],
      trim: true,
      validate(value){
          if(!validator.isEmail(value)){
              throw new Error("Please enter a valid email address")
          }
      },
      unique: true
    },
    phone: {
        type: Number,
        required: [true, "Please add your phone number"],
        min: 10,
    },
    password :{
        type: String,
        select: false,
        minlength: [6, "Password should have a minimum of 6 characters"],
        required: true
    },
    usage: {
        type: String,
        enum: {
            values: ['personal','contribution'],
            message: 'Please indicate what you want to use TM for'
        },
        default: 'personal'
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'cordinator', 'admin'],
            message: "Please ensure you inidcate your role"
        },
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    passwordRecoveryToken: String,
    passwordRecoveryExpiry: Date
})

module.exports = mongoose.model('User', userSchema)