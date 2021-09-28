import express from 'express';
import patientsService from '../services/patientService';
import { Patient } from '../types';
import { v1 as uuid } from 'uuid';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('get all patients- inside router');

  res.json(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const id = uuid();

  try {
    const newPatient: Patient = { name, dateOfBirth, ssn, gender, occupation, id };

    const addedPatient = patientService.addNewPatient(newPatient);
    res.json(addedPatient);

  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

export default router;