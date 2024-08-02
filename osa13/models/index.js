const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const ActiveSession = require('./active_session')

User.hasMany(Blog)
Blog.belongsTo(User)
ActiveSession.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList })

ReadingList.belongsTo(User, { foreignKey: 'userId' })
ReadingList.belongsTo(Blog, { foreignKey: 'blogId' })

User.hasMany(ReadingList, { foreignKey: 'userId', as: 'readingLists' })
Blog.hasMany(ReadingList, { foreignKey: 'blogId', as: 'blogReadings' })

module.exports = { Blog, User, ReadingList }