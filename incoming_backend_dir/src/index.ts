import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routers/diagnoses';
import patientsRouter from './routers/patients';
import morgan from 'morgan';
import config from './config';

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('build'));
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);



app.get('/ping', (_req, res) => {

  console.log('someone pinged here');
  res.send('Patientor backend pongs back');
});



app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
