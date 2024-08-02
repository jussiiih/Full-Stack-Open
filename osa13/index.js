
const express = require('express')
const app = express()
require('express-async-errors')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const authorsrouter = require('./controllers/authors')
const readingListsRouter = require('./controllers/readingLists')

const { errorHandler } = require('./util/middleware')


app.use(express.json())
app.use('/', blogsRouter)
app.use('/', usersRouter)
app.use('/', loginRouter)
app.use('/', logoutRouter)
app.use('/', authorsrouter)
app.use('/', readingListsRouter)

app.use(errorHandler)

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    
    })
}

start()