import ReactDOM from 'react-dom/client'
import store from './components/store'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteService from './services/anecdotes'
import appendReducer, {appendAnecdote} from './reducers/anecdoteReducer'


anecdoteService.getAll().then(anecdotes =>
  anecdotes.forEach(anecdote => {
    store.dispatch(appendAnecdote(anecdote))    
  })
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)