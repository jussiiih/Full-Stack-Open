import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
    const content = action.payload 
    state.push({
      content,
      votes: 0,
      id: getId()
      })
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
  }

}
})

export const { createAnecdote, addVote, appendAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer

