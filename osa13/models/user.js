const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
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
    modelName: 'user'
})

module.exports = User