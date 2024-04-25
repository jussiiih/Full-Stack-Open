const Total = ({total}) => {

    let totalExercises = total.reduce(function(sum, part) {
    return sum + part.exercises
    }, 0)
    return (
      <>
        <b>Total of {totalExercises} exercises</b>
      </>
    )
  }

export default Total