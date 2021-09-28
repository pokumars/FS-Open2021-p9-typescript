import express from 'express';
import patientsService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('get all patients- inside router');

  res.json(patientsService.getNonSensitivePatients());
});

export default router;