import express from 'express'
const app = express()
import calculateBmi from './bmiCalculator'


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack')
})

app.get('/bmi', (req, res) => {
 const height = req.query.height
 const weight   = req.query.weight
 if (isNaN(Number(height)) || isNaN(Number(weight)))
    {
        throw new Error("malformatted parameters")
    }
else {
    res.send(calculateBmi(Number(height), Number(weight)))
}

})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})