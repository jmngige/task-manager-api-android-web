const express = require('express')
const dotenv = require('dotenv')
const app = express()
const dbConnection = require('./config/database')
require('colors')

//load environment variables
dotenv.config({path: './config/.env'})

//handle any uncaught exceptions
process.on('uncaughtException', err=>{
    console.log(err.message)
    process.exit(1)
})

//initialize database promise
dbConnection()


const PORT = process.env.PORT
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