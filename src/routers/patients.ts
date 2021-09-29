import express from 'express';
import patientsService from '../services/patientService';
import { NewPatient } from '../types';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('get all patients- inside router');

  res.json(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  
  try {
    //create these parses 
    const newPatient: NewPatient = utils.toNewPatient(req.body); 
    console.log(newPatient);

    const addedPatient = patientService.addNewPatient(newPatient);
    console.log(addedPatient);
    res.json(addedPatient);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

export default router;