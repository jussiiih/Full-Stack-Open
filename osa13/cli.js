require('dotenv').config()
const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL
    //, {logging: false}
)

class Blog extends Model {}

Blog.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
    author: {
        type: DataTypes.TEXT
        },
    url: {
        type: DataTypes.TEXT,
        allowNull: false    
        },
    title: {
        type: DataTypes.TEXT,
        allowNull: false    
        },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0  
        }
    }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
    })

Blog.sync()

app.get('/api/blogs', async(req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

app.get('/api/blogs/:id', async (req, res) => {
    console.log(`Fetching blog with id: ${req.params.id}`) // Added log for debugging
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        res.json(blog)
    }
    else {
        res.status(404).end()
    }
})

app.post('/api/blogs', async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body)
        res.json(newBlog)
    }
    catch (error) {
        return res.status(400).json({ error })
    }
})

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const blogToBeDeleted = await Blog.findByPk(req.params.id)
        if (blogToBeDeleted) {
            await blogToBeDeleted.destroy()
            res.json(blogToBeDeleted)}
        else {
            res.status(404).end()
        }
    }
    catch (error) {
        return res.status(400).json({ error })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

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