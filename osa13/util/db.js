const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(process.env.DATABASE_URL
    //, {logging: false}
)

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('database connected')
    }
    catch (error) {
        console.log('conncetion to database failed')
        return process.exit(1)
    }

    return null
}

module.exports = { connectToDatabase, sequelize }