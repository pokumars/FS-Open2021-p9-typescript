import patients from "../../data/patients";
import { NonSensitivePatient } from "../types";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, dateOfBirth, name, gender, occupation }) => {
    return { id, dateOfBirth, name, gender, occupation };
  });
};

export default {
  getNonSensitivePatients
};