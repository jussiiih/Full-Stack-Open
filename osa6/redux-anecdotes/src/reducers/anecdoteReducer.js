import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    /*addVote(state, action){
      const id = action.payload.id
      const anecdoteToBeVoted = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = {
        ...anecdoteToBeVoted,
        votes: anecdoteToBeVoted.votes + 1
        }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    },*/

    appendAnecdote (state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    },

    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
    }

  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote} = anecdoteSlice.actions

export const addVote = (anecdote) => {
  return async dispatch => {{
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote)
    
    dispatch(updateAnecdote(updatedAnecdote)) 
  }}
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer

