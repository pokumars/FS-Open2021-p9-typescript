import patients from "../../data/patients";
import { NonSensitivePatient, Patient } from "../types";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, dateOfBirth, name, gender, occupation }) => {
    return { id, dateOfBirth, name, gender, occupation };
  });
};

const addNewPatient = (newPatient: Patient): Patient => {
  patients.push(newPatient);

  return newPatient;
};

export default {
  getNonSensitivePatients,
  addNewPatient
};