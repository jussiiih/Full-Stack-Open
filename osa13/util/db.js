const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DATABASE_URL, {
    //, {logging: false},
    // dialectOptions: {ssl: {require: true,rejectUnauthorized: false}}
})



const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        console.log('database connected')
    }
    catch (error) {
        console.log('conncetion to database failed', error)
        return process.exit(1)
    }

    return null
}

const MigrationConf = {
    migrations: {
        glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations'}),
    context: sequelize.getQueryInterface(),
    logger: console,
}

const runMigrations = async () => {
    const migrator = new Umzug(MigrationConf)
    const migrations = await migrator.up()
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name)
    })
}

const rollBackMigration = async () => {
    await sequelize.authenticate()
    const migration = new Umzug(MigrationConf)
    await migration.down()
}

module.exports = { connectToDatabase, sequelize, rollBackMigration }