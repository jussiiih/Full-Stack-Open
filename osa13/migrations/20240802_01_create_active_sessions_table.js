const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({context: queryInterface}) => {
        queryInterface.createTable('active_sessions',{
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

        })
    },

    down: async ({ context: queryInterface }) => {
        queryInterface.dropTable('active_sessions')
    }
}