import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
     state.push(action.payload)
    },

  addVote(state, action){
    const id = action.payload.id
    const anecdoteToBeVoted = state.find(anecdote => anecdote.id === id)
    const votedAnecdote = {
      ...anecdoteToBeVoted,
      votes: anecdoteToBeVoted.votes + 1
      }
    return state.map(anecdote =>
      anecdote.id !== id ? anecdote : votedAnecdote
    )
  },

  appendAnecdote (state, action) {
    state.push(action.payload)
  },

  setAnecdotes(state, action) {
    return action.payload
  }

}
})

export const { createAnecdote, addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer

