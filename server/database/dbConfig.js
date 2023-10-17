const mongoose = require('mongoose')

const CONFIG = require('../config/config')


const MongoDB_URI = CONFIG.MongoDB_URI

mongoose.set('strictQuery', true)
const connectDb = () => {
    mongoose.connect(MongoDB_URI);

    mongoose.connection.on('connected', () => {
        console.log('Database successfully connected!')
    });

    mongoose.connection.on('error', (error) => {
        console.log(`Unable to connect to the database : ${error}`)
    })

}


module.exports = connectDb