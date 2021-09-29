import patients from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, dateOfBirth, name, gender, occupation }) => {
    return { id, dateOfBirth, name, gender, occupation };
  });
};

const addNewPatient = (newPatient: NewPatient): Patient => {
  const patientToAdd = {
    ...newPatient,
    id: uuid()
  };

  patients.push(patientToAdd);

  return patientToAdd;
};

export default {
  getNonSensitivePatients,
  addNewPatient
};