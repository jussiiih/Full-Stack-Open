const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB', error.message)
  })

const typeDefs = `
    type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int!
    }

    type Book {
      title: String!
      published: Int
      author: Author!
      id: ID!
      genres: [String]
    }

    type User {
      username: String!
      favoriteGenre: String!
      id: ID! 
    }

    type Token {
      value: String!
    }

    type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
    }

    type Mutation {
      addBook(
        title: String!
        published: Int
        author: String!
        genres: [String]
      ): Book
      
      editAuthor(
        name: String!
        setBornTo: Int
      ): Author

      createUser(
        username: String!
        favoriteGenre: String!
      ): User

      login(
        username: String!
        password: String!
      ): Token
    }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      if (args.author) {
          const author = await Author.findOne({ name: args.author })
          if (author) {
              filter.author = author._id
          } else {
              return []
          }
      }

      if (args.genre) {
          filter.genres = { $in: [args.genre] }
      }

      return Book.find(filter).populate('author')
  },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  
  Author: {
    bookCount: async (root) => {
      return Book.countDocuments({ author: root._id })
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })
      
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not autenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        }) 
      }
      
      if (!author) {
        author = new Author({ name: args.author})
        
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error: error.message
            }
          })
        }
      }
      
      const book = new Book ({ ...args, author: author._id })

      try {
        await await book.save()
        return Book.findById(book._id).populate('author')
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error: error.message
          }
        })
      }
    },
    
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not autenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        }) 
      }
      
      if (author) {
        author.born = args.setBornTo
        try {
          return author.save()
        } catch (error) {
          throw new GraphQLError('Changing born year failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.setBornTo,
              error: error.message
            }
          })
        }

      }
      else {
        throw new GraphQLError('Author not found', {
          extensions:{
            code: 'NOT_FOUND',
            invalidArgs: args.name
          }
        })
      }

    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre || "Unknown" })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error: error.message
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'mypassword') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}

    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },

  context: async ({ req, res}) => {
    const auth = req ? req.headers.authorization: null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )

      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }

}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})