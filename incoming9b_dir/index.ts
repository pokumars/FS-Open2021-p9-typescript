import express = require('express');
import { calculateBmi, parseArguments } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
//import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { mass, height } = parseArguments(["0", "0", String(req.query.height), String(req.query.mass)]);
    res.json({
      mass: mass,
      height: height,
      bmi: calculateBmi(height, mass)
    });

  } catch (error) {
    res.send(`malformatted parameters. ${error}`);
  }
});

app.post('/exerciseCalculator', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, daily_target } = req.body;
  console.log('daily_exercises', daily_exercises, 'daily_target', daily_target);

  try {
    if (!daily_exercises || !daily_target) {
      throw new Error("parameters missing");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    else if (daily_exercises.findIndex((n: any) => isNaN(Number(n))) > -1 || isNaN(daily_target)) {

      throw new Error("malformatted parameters");
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      res.json(calculateExercises(daily_exercises.map((n: any) => Number(n)), Number(daily_target)));
    }

  } catch (error) {
    const errorMessage = 'Error, something bad happened, message: ';
    if (error instanceof Error) {
      //Read this to understand whywe need the if clause
      //https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#unknown-on-catch-clause-bindings
      //https://stackoverflow.com/questions/60151181/object-is-of-type-unknown-typescript-generics
      console.log(errorMessage, error.message);
      res.json({ error: `${errorMessage} ${error.message}` });
    } else {
      res.json({ error: errorMessage});
    }
    
  }

});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`App operationg on port ${PORT}`);
});