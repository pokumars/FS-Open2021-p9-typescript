import patients from "../../data/patients";
import { NewPatient, PublicPatient, Patient } from "../types";
import { v1 as uuid } from 'uuid';
import { isString } from "../utils";

const getNonSensitivePatients = (): PublicPatient[] => {
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


export const findPatientById = (id: string): Patient |undefined => {
  if (!id || !isString(id)) {
    throw new Error("Incorrect typeof or missing id: "+ id);
  }
  const returnedPatient = patients.find( p => p.id === id);

  return returnedPatient? {...returnedPatient, entries: []}: undefined;
};

export default {
  getNonSensitivePatients,
  addNewPatient,
  findPatientById
};