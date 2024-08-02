const connectDB = require("./config/db")
const dotenv = require('dotenv').config()
const TaskRoutes = require("./routes/taskRoutes")
const {errorHandler, notFound} = require("./middlewares/errorMiddleware")
const express = require('express')
const morgan = require("morgan")
const cors = require('cors')

const app = express()

connectDB()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
    // origin: '*',
}))

// middleware to log out each request details
app.use(morgan('combined'))

app.use('/api/tasks', TaskRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(5000, console.log('listening at PORT 5000'))