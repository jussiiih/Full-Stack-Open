import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      if (state.filter === ''){
        return state.anecdotes}
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    })
    const dispatch = useDispatch()
  
    const vote = (id) => {
      console.log('vote', id)
      const anecdoteVoted = anecdotes.find(anecdote => anecdote.id === id)
      dispatch(addVote(anecdoteVoted))


      dispatch(changeNotification(`Anecdote "${anecdoteVoted.content}" voted`))
      setTimeout(()=>{dispatch(changeNotification(''))}, 5000)
    }
    return (
        [...anecdotes].sort((a,b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
        )
    )
}

export default AnecdoteList