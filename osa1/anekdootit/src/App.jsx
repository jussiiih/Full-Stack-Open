import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Header = ({text}) => (
  <h2>{text}</h2>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, SetVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})
  const [maxKey, setMaxKey] = useState(null);


  const GenerateAnecdote= () => {
    const number = Math.floor(Math.random() * 8)
    setSelected(number)  
  }

  const AddVote = () => { 
    SetVotes(prevVotes => {
      const newVote = {...prevVotes}
      newVote[selected] += 1
      let maxKey = null
      let maxVotes = 0
      for (const [key, value] of Object.entries(newVote)) {
        if (value > maxVotes) {
          maxKey = key
          maxVotes = value
        }
      }
      setMaxKey(maxKey)
      return newVote;
    });
  };
  
  

  return (
    <div>
      <Header text='Anecdote of the day'/>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={AddVote} text='Vote'/>
      <Button handleClick={GenerateAnecdote} text='Next anecdote'/>
      <Header text='Anecdote with most votes'/>
      <p>{anecdotes[maxKey]}</p>
    </div>
  )
}

export default App