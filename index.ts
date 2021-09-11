import express = require('express');
import { calculateBmi, parseArguments } from './bmiCalculator';

const app = express();

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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`App operationg on port ${PORT}`);
});