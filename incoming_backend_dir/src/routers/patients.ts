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

router.post('/:id/entries', (req, res) => {

  try {
    const { id } =req.params;
    //console.log('raw new  entry', req.body);
    const newEntry = utils.toNewEntry(req.body);

    const updatedPatient= patientService.addNewEntryToPatient(newEntry, id);
    //console.log(updatedPatient);
    res.json(updatedPatient);    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log('e.message ', e.message);
    //res.status(400).send({error: `${e.messsage}`, test: 'test'});

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(400).send({error: e.message});
  }
});

router.post('/', (req, res) => {
  
  try {
    //create these parses 
    const newPatient: NewPatient = utils.toNewPatient(req.body); 

    const addedPatient = patientService.addNewPatient(newPatient);
    console.log(addedPatient);
    res.json(addedPatient);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e.message);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(400).send({error: e.message});
  }
});


export default router;