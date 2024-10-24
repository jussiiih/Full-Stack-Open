/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const app = express();
import calculateBmi from './bmiCalculator';
import calculateExcercises from './excerciseCalculator';
app.use(express.json());


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight   = req.query.weight;
 if (isNaN(Number(height)) || isNaN(Number(weight)))
    {
        res.status(400).send("malformatted parameters");
    }
else {
    res.send(calculateBmi(Number(height), Number(weight)));
}
});


// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/exercises', (req: any ,res) => {
    const body = req.body;
    if (!body.daily_exercises || !body.target) {
        res.status(400).send("parameters missing");
    }
    console.log(req.body);
    const dailyExercises: number[] = body.daily_exercises;
    const target: number = body.target;
    if (!Array.isArray(dailyExercises) || dailyExercises.length === 0 || dailyExercises.some(arg => isNaN(Number(arg))) || isNaN(Number(target))) {
        res.status(400).send("malformatted parameters");
    }
    res.send(calculateExcercises(dailyExercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});