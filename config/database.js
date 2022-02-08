const mongoose = require('mongoose')
 require('colors')


const databaseConn = async ()=>{
    const conn = await mongoose.connect(process.env.DATABASE_URI, {
        useNewUrlParser: true
    })

    console.log(`Database connected at: ${conn.connection.host}`.cyan.bold.inverse)
}

module.exports = databaseConn