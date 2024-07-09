require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const Blog =  require('./models/blog')
const logger = require('./utils/logger')
const config = require('./utils/config')



app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})