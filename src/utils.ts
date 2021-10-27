import diagnoses from "../data/diagnoses";
import { Discharge, EntryTypeNames, EntryWithoutId, Gender, HealthCheckEntry,
   HealthCheckRating, HospitalEntry, NewPatient, OccupationalHealthcareEntry } from "./types";


/**
 * Parses req.object and makes sure that all passed values are of the right type or else throws an error with a message.
 * The errors are declared in the parsers of the individual fields so you wont fiond them directly in this functions
 *
 * @param object the request.object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
  
  const newPatient: NewPatient = {
    name: parseGenericStringType(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseGenericStringType(object.ssn, 'ssn'),
    gender: parseGender(object.gender),
    occupation: parseGenericStringType(object.occupation, 'occupation'),
    entries: []
  };
  //console.log(newPatient);
  return newPatient;
};

const toNewEntry = (object: EntryWithoutId): EntryWithoutId => {
  switch (object.type) {
    case "HealthCheck":
      return toHealthCheckEntry(object);

    case "Hospital":
      return toHospitalEntry(object);
    case "OccupationalHealthcare":
      return toOccupationalHealthcareEntry(object);

    default:
      //console.log('the errored new entry - ',object);
      throw new Error("This did not match any of the Entry types.");
  }
};

const parseDate = (date: unknown): string => {
  /*no operations are permitted on an unknown without first asserting or narrowing to a more specific type. This fuxn ensures we indeed have the type we are returning.*/
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: "+ date);
  }

  return date;
};

const parseGender = (gndr: unknown): Gender => {
  /*no operations are permitted on an unknown without first asserting or narrowing to a more specific type. This fuxn ensures we indeed have the type we are returning.*/
  if (!gndr || !isString(gndr) || !isGender(gndr)) {
    throw new Error("Incorrect or missing gender: "+ gndr);
  }
  return gndr;
};


export const isString = (text: unknown): text is string => {
  //look up 'Type guards'  to understand what the 'parameterName is Type' means
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gndr: any): gndr is Gender => {
  //look up 'Type guards'  to understand what the 'parameterName is Type' means
  //https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates

  return Object.values(Gender).includes(gndr);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
    //look up 'Type guards'  to understand what the 'parameterName is Type' means
  //https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  /*no operations are permitted on an unknown without first asserting or narrowing to a more specific type. This fuxn ensures we indeed have the type we are returning.*/
  if (!rating || Number.isNaN(rating) || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing HealthCheckRating: "+ rating);
  }

  return rating;
};

const parseDiagnosisCodes = (codes: Array<unknown>): Array<string> =>{

  const sanitizedCodes: Array<string> = [];
  //DiagnosisCodes is optional so if it is empty or undefined, then we just return an empty array
  if (codes.length === 0 || codes === undefined || codes === null ) return sanitizedCodes;

  codes.forEach(code => {
    if (!code || !isString(code)) {
      throw new Error("Incorrect or missing Diagnosis code: "+ code);
    } else if (diagnoses.findIndex(d => d.code === code) == -1) {
      throw new Error("This diagnosis code does not exist in our database of diagnosis codes - "+ code);
    }
    else{
      sanitizedCodes.push(code);
    }   
  });

  return sanitizedCodes;
};




/**
 * @param genericString The string being tested
 * @param nameOfValue the name of it so we can write it in error codes. e.g if nameOfValue is description, we can write 'incorrect or missing description' 
 * @returns 
 */
const parseGenericStringType = (genericString: unknown, nameOfValue: string): string => {
    /*no operations are permitted on an unknown without first asserting or narrowing to a more specific type. This fuxn ensures we indeed have the type we are returning.*/
  if (!genericString || !isString(genericString)) {
    throw new Error(`Incorrect or missing ${nameOfValue}: `+ genericString);
  }

  return genericString;
};

const parseDischarge = (date: unknown, criteria: unknown): Discharge => {
  const discharge = {
    date: parseDate(date),
    criteria: parseGenericStringType(criteria, 'criteria (of Discharge type)')
  };

  return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toHospitalEntry = (object: any):  Omit<HospitalEntry, 'id'> => {
  const newHospitalEntry = {
    description: parseGenericStringType(object.description, 'description'),
    date: parseDate(object.date),
    specialist: parseGenericStringType(object.specialist, 'specialist name'),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    type : "Hospital" as EntryTypeNames.Hospital,
    //discharge is optional so if it is empty or undefined, then we just return undefined
    discharge: object.discharge? parseDischarge(object.discharge.date, object.discharge.criteria): undefined,
  };

  return newHospitalEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toHealthCheckEntry = (object: any):  Omit<HealthCheckEntry, 'id'> => {
  const newHealthCheckEntry = {
    description: parseGenericStringType(object.description, 'description'),
    date: parseDate(object.date),
    specialist: parseGenericStringType(object.specialist, 'specialist name'),
    diagnosisCodes:parseDiagnosisCodes(object.diagnosisCodes),
    type : "HealthCheck" as EntryTypeNames.HealthCheck,
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };

  return newHealthCheckEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toOccupationalHealthcareEntry = (object: any):  Omit<OccupationalHealthcareEntry, 'id'> => {
  const newOccupationalHealthcareEntry = {
    description: parseGenericStringType(object.description, 'description'),
    date: parseDate(object.date),
    specialist: parseGenericStringType(object.specialist, 'specialist name'),
    diagnosisCodes:parseDiagnosisCodes(object.diagnosisCodes),
    type : "OccupationalHealthcare" as EntryTypeNames.OccupationalHealthcare,
    employerName: parseGenericStringType(object.employerName, 'employerName'),
    
  };
  if (object.sickLeave && typeof object === "object"&& object.sickLeave.startDate&& object.sickLeave.endDate) {
    return{...newOccupationalHealthcareEntry, 
      sickLeave :{
        startDate: parseDate(object.sickLeave.startDate),
        endDate: parseDate(object.sickLeave.endDate)
      }};
  } 

  return newOccupationalHealthcareEntry;
};



export default {
  toNewPatient, toNewEntry
};