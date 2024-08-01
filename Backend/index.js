const connectDB = require("./config/db")
const TaskRoutes = require("./routes/taskRoutes")
const {errorHandler} = require("./middlewares/errorMiddleware")
const express = require('express')
const cors = require('cors')

const app = express()

connectDB()

app.use(express.json())

// middleware to log out each request details
app.use(morgan('combined'))

app.use('/api/tasks', TaskRoutes)

app.use(errorHandler)

app.listen(5000, console.log('listening at PORT 5000'))