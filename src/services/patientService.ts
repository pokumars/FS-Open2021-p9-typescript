import patients from "../../data/patients";
import { NewPatient, PublicPatient, Patient, Entry, EntryWithoutId } from "../types";
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

/**
 * 
 * @param newEntry 
 * @param patientId 
 * @returns a patient updated with the entry
 */
const addNewEntryToPatient = (newEntry: EntryWithoutId, patientId: string) : Patient => {

  const entryToAdd: Entry = {
    ...newEntry,
    id: uuid()
  };

  //find patient's index
  const index = patients.findIndex(element => element.id == patientId);
  //update value at that index
  patients[index].entries.push(entryToAdd);

  return patients[index];
}; 


export const findPatientById = (id: string): Patient |undefined => {
  if (!id || !isString(id)) {
    throw new Error("Incorrect typeof or missing id: "+ id);
  }
  const returnedPatient = patients.find( p => p.id === id);

  return returnedPatient? {...returnedPatient}: undefined;
};

export default {
  getNonSensitivePatients,
  addNewPatient,
  findPatientById,
  addNewEntryToPatient
};