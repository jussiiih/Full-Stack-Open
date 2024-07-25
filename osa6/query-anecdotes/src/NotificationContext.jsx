import PropTypes from 'prop-types'
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'NEW_ANECDOTE':
          return `Anecdote ${action.payload} added`
      case 'VOTE':
          return `Anecdote ${action.payload} voted`
      case 'TOO_SHORT':
          return `Too short anecdote, must have length 5 or more`
      case 'CLEAR':
          return ''
      default:
          return state
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={{ notification, notificationDispatch }}>
          {children}
        </NotificationContext.Provider>
      )
}

NotificationContextProvider.propTypes = {
    children: PropTypes.node.isRequired
  }

export const useNotification = () => useContext(NotificationContext)

export default NotificationContext