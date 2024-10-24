/*

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExcercises = (excerciseHours: number[], targetAmount: number): Result  => {
  const periodLength = excerciseHours.length
  const trainingDays = excerciseHours.filter(hour => hour > 0).length
  const averageTime = excerciseHours.reduce((newHours, currentHours) => newHours + currentHours, 0) / periodLength
  const success = Math.min(...excerciseHours) > targetAmount
  const target = targetAmount
  const successDays = excerciseHours.map(hours => hours >= target).filter(day => day === true).length
  let rating: number = 0
  let ratingDescription: string = 'Terrible'
  if (successDays >= 6) {
    ratingDescription = 'Great'
    rating = 3
  }
  else if (successDays >= 4) {
    ratingDescription = 'Good'
    rating = 2
  }
  else if (successDays >= 1) {
    ratingDescription = 'Bad'
    rating = 1
  }
  else if (successDays >= 0) {
    ratingDescription = 'Terrible'
    rating = 0
  }


  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageTime
  }
}

console.log(calculateExcercises([3, 0, 2, 4.5, 0, 3, 1], 2))
*/

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface Arguments {
  days: number[]
  target: number
}

const parseExcerciseArguments = (args: string[]): Arguments => {
  if (args.length < 12) throw new Error('You provided less than 8 numbers')
  if (args.length > 12) throw new Error('You provided more than 8 numbers')
  args.shift()
  args.shift()
  if (args.map(arg => Number(arg)).find(arg => isNaN(arg)) === undefined) {
    const target = args.shift()
      return {
        days: args.map(arg => Number(arg)),
        target: Number(target)
      }
  }
  else {
      throw new Error('Please, provide numbers as arguments')
  }
}

const calculateExcercises = (excerciseHours: number[], targetAmount: number)  => {
  const periodLength = excerciseHours.length
  const trainingDays = excerciseHours.filter(hour => hour > 0).length
  const averageTime = excerciseHours.reduce((newHours, currentHours) => newHours + currentHours, 0) / periodLength
  const success = Math.min(...excerciseHours) > targetAmount
  const target = targetAmount
  const successDays = excerciseHours.map(hours => hours >= target).filter(day => day === true).length
  let rating: number = 0
  let ratingDescription: string = 'Terrible'
  if (successDays >= 6) {
    ratingDescription = 'Great'
    rating = 3
  }
  else if (successDays >= 4) {
    ratingDescription = 'Good'
    rating = 2
  }
  else if (successDays >= 1) {
    ratingDescription = 'Bad'
    rating = 1
  }
  else if (successDays >= 0) {
    ratingDescription = 'Terrible'
    rating = 0
  }

  const result = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageTime
  }

  console.log(result)
}

try {
  const { days, target } = parseExcerciseArguments(process.argv)
  calculateExcercises(days, target )
} catch (error: unknown) {
  let errorMessage = 'Something went wrong'
  if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message
  }
  console.log(errorMessage)
}
