
const express = require('express')
const app = express()
require('express-async-errors')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const { errorHandler } = require('./util/middleware')

/*const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).send({ error: error.errors.map(e => e.message) })
    }
    if (error.status === 400) {
        return res.status(400).send({ error: 'id is not in database'})
    }
    else if (error.status === 404) {
        return res.status(404).send({ error: 'id is not in database'})
    }
    else if (error.status === 500) {
        return res.status(500).send({ error: 'ValidationError'})
    }
    next(error)
}*/

app.use(express.json())
app.use('/', blogsRouter)
app.use(errorHandler)

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    
    })
}

start()

// Tehtävät 13.1 - 13.3
/*const main = async () => {
    try {
        await sequelize.authenticate()
        const blogs = await sequelize.query('SELECT * FROM blogs', {type: QueryTypes.SELECT  
        })
        
        blogs.forEach(blog=>{
            console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`)
        })

        sequelize.close()
    }

    catch (error) {
        console.log ('Unable to connenct to the database:', error)
    }
}

main()*/