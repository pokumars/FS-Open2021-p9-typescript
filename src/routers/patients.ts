import express from 'express';
import { NewPatient } from '../types';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('get all patients- inside router');

  res.json(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params; 
    const foundPatient = patientService.findPatientById(id);

    foundPatient? res.json(foundPatient) : res.status(404).send("No patient of such id was found");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).send(error.message || "Error in attempting to get a single patient");
  }
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