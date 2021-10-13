import { Gender, NewPatient } from "./types";


/**
 * Parses req.object and makes sure that all passed values are of the right type or else throws an error with a message.
 * The errors are declared in the parsers of the individual fields so you wont fiond them directly in this functions
 * 
 * @param object the request.object 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
  
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
  //console.log(newPatient);
  return newPatient;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name: "+ name);
  }

  return name;
};


const parseDate = (date: unknown): string => {
  /*no operations are permitted on an unknown without first asserting or narrowing to a more specific type. This fuxn ensures we indeed have the type we are returning.*/
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: "+ date);
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  /*no operations are permitted on an unknown without first asserting or narrowing to a more specific type. This fuxn ensures we indeed have the type we are returning.*/
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn: "+ ssn);
  }
  return ssn;
};

const parseGender = (gndr: unknown): Gender => {
  /*no operations are permitted on an unknown without first asserting or narrowing to a more specific type. This fuxn ensures we indeed have the type we are returning.*/
  if (!gndr || !isString(gndr) || !isGender(gndr)) {
    throw new Error("Incorrect or missing gender: "+ gndr);
  }
  return gndr;
};

const parseOccupation = (occupation: unknown): string => {
  /*no operations are permitted on an unknown without first asserting or narrowing to a more specific type. This fuxn ensures we indeed have the type we are returning.*/
  if (!occupation || !isString(occupation) ) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
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

  return Object.values(Gender).includes(gndr);
};

export default {
  toNewPatient
};