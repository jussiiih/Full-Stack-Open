import { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)



const Statistics = ({good, bad, neutral}) => {
  const all = good + neutral + bad
  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return(
  <table>
    <StatisticLine text='Good' value={good}/>
    <StatisticLine text='Neutral' value={neutral}/>
    <StatisticLine text='Bad' value={bad}/>
    <StatisticLine text='All' value={all}/>
    <StatisticLine text='Average' value={(good - bad) / all}/>
    <StatisticLine text='Positive' value= {good / all * 100 + ' %'}/>
  </table>)

}

const StatisticLine = ({value,text}) => (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
)



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  const increaseGood = () => setGood(good +1)
  const increaseBad = () => setBad(bad +1)
  const increaseNeutral = () => setNeutral(neutral +1)

  return (
    <div>
      
      <Header text='Give Feedback'/>
      <Button handleClick={increaseGood} text='Good'/>
      <Button handleClick={increaseNeutral} text='Neutral'/>
      <Button handleClick={increaseBad} text='Bad'/>
      <Header text='Statistics'/>
      <Statistics good={good} bad={bad} neutral= {neutral}/>
    </div>
  )
}

export default App