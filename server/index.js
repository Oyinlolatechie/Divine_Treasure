const express = require('express');
const cors = require('cors')


const CONFIG = require('./config/config')
const postRouter = require('./routers/postRouter');
const connectDb = require('./database/dbConfig');
const { errorHandlerMiddleware, joiErrors } = require('./middleware/errorHandler');
const schoolDataRouter = require('./routers/schoolData');


const app = express()

app.use(cors())


//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//connect to the database
connectDb()

app.use('/api/v1', postRouter)
app.use(joiErrors)

app.use('/api/v1/school_data', schoolDataRouter)

app.get('/', (req, res) => {
    res.send('Welcome to divine-school server!')
})

app.get('*', (req, res) => {
    res.send(' Sorry Page Not Found!')
})


app.use(errorHandlerMiddleware)

app.listen(CONFIG.PORT, () => {
    console.log(`Server started on port : http://localhost:${CONFIG.PORT}`)

})