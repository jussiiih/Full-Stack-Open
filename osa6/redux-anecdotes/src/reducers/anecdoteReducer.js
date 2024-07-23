import { createSlice } from '@reduxjs/toolkit'

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
  }

}
})

export const { createAnecdote, addVote, appendAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer

