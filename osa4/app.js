require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const Blog =  require('./models/blog')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')



app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)

module.exports = app