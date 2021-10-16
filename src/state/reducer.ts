import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_TO_PATIENT_INFO_LIST";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_TO_PATIENT_INFO_LIST": 
      return {
        ...state,
        patientInfo:{
          ...state.patientInfo,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

//Action Creators
//https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns#action-creators

/**
 * 
 * @param {Patient} patient 
 * @returns {Action} action to add the fetched patient's details to state so that it doesnt need to be fetched again.
 */
export const addToPatientInfoList = (patient: Patient): Action => {
  return { type: "ADD_TO_PATIENT_INFO_LIST", payload: patient };
};

/**
 * 
 * @param {Patient} newPatient 
 * @returns {Action} action to add a newly created patient
 */
export const addPatient = (newPatient: Patient): Action => {
  return { type: "ADD_TO_PATIENT_INFO_LIST", payload: newPatient };
};

/**
 * 
 * @param {Patient[]} patientList 
 * @returns {Action} action to add the array of Patients to state
 */
export const setPatientList =(patientList: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientList };
};