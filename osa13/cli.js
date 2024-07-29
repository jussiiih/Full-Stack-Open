//require('dotenv').config()
//const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')

app.use(express.json())
app.use('/', blogsRouter)

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