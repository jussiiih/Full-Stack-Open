const Header = (props) => {
  return (
    <>
    <h1>{props.name}</h1>
    </>
  )
}

const Total = (props) => {
  return (
    <>
    Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}
    </>
  )
}

const Part = (props) => {
  return (
    <>
      {props.part.name} {props.part.exercises}
      <br></br>
    </>
  )
}

const Content = (props) => {
  return (
    <>
    <Part part = {props.parts[0]}/>
    <Part part = {props.parts[1]}/>
    <Part part = {props.parts[2]}/>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header name={course.name}/>
      <Content parts = {course.parts}/>
      <Total total= {course.parts}/>
    </div>
  )
}

export default App