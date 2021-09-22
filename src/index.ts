import express from 'express';
import diagnosisService from './services/diagnosisService';
import diagnosesRouter from './routers/diagnoses';

const app = express();
app.use(express.json());
app.use('/api/diagnoses', diagnosesRouter);


app.get('/ping', (_req, res) => {

  console.log('someone pinged here');
  res.send('Patientor backend pongs back');
});

app.get('/api/diagnoses', (_req, res) => {
  console.log('get all diagnoses');
  res.send(diagnosisService.getDiagnoses());
});

//
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
