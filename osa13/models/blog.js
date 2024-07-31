const { Model, DataTypes } = require('sequelize')

const {sequelize } = require('../util/db')

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
    year: {
        type: DataTypes.INTEGER,
        validate: {
            min: {
                args: [1991],
                msg: 'Year must be at least 1991'
            },
            max: {
                args: [new Date().getFullYear()],
                msg: `Year can not be over ${new Date().getFullYear()}`
            }
        }
        },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0  
        },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    }, 
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    }
    }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
    })


module.exports = Blog