const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

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

userSchema.pre("save", async function(next){
    const user = this
    if(user.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

//delete files associated with user
userSchema.pre('remove', async function(next){
    await Task.deleteMany({ user: this._id})
    next()
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateJWT = function(){
    const user = this
    return  jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRY
    })
}

module.exports = mongoose.model('User', userSchema)