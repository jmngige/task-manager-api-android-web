const express = require('express')
const dotenv = require('dotenv')
const app = express()
const bp = require('body-parser')
const bodyParser = require('body-parser')
const dbConnection = require('./config/database')
require('colors')
const errorHandler = require('./middlewares/error.js')
//load environment variables
dotenv.config({path: './config/.env'})


//handle any uncaught exceptions
process.on('uncaughtException', err=>{
    console.log(err.message)
    console.log(err)
    process.exit(1)
})

//load application routes
const taskRoutes = require('./routes/task')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')


//initialize database promise
dbConnection()

//implement body parser
app.use(express.json())
app.use(bp.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("public"))

//
app.use('/api/v1', taskRoutes)
app.use('/api/v1', userRoutes)
app.use('/api/v1', authRoutes)

//load the error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, err=>{
    console.log(`Server is up and running on port ${process.env.PORT}`.green.inverse)
})

//handle unhandles promise rejections
process.on('unhandledRejection', err=>{
    console.log(`Error: ${err.message}`)
    server.close(()=>{
        process.exit(1)
    })
})