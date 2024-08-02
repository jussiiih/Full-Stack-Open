const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ActiveSession extends Model {}

ActiveSession.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id'}
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
},{
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'activeSessions'
})

module.exports = ActiveSession