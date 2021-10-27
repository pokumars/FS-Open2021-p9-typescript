export interface Diagnosis  {
  code: string
  name: string
  latin?: string
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "Critical" = 3,
}

export interface Discharge {
  date: string
  criteria: string
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  //we already have a Diagnosis type defined, we can refer to the code field of the Diagnosis type directly in case its type ever changes
  //https://fullstackopen.com/en/part9/react_with_types#full-entries
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum EntryTypeNames {
  HealthCheck ="HealthCheck",
  OccupationalHealthcare ="OccupationalHealthcare",
  Hospital= "Hospital"
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryTypeNames.HealthCheck
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryTypeNames.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave
}

export interface HospitalEntry  extends BaseEntry {
  type: EntryTypeNames.Hospital;
  discharge?: Discharge
}

//refer to this link for more info on this
//https://fullstackopen.com/en/part9/react_with_types#full-entries
// Define special omit for unions
type UnionOmit <T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;


//https://fullstackopen.com/en/part9/react_with_types#full-entries
export type Entry = 
| HospitalEntry
| HealthCheckEntry 
| OccupationalHealthcareEntry;

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: string
  occupation: string
  entries: Entry[]
}

export enum Gender {
  Male= "male",
  Female= "female",
  Other= "other"
}

/*Utility types are so useful in typescript

The Pick utility type allows us to choose which fields of an existing type we want to use.
So in order to return the DiaryEntry without the 'comment' field, we can do this
const PublicPatient = (): Pick<Patient,  'id' | 'dateOfBirth' | 'name' | 'gender'| 'occupation'>[] => {}

But since we are only trying to remove the 'comment' field, we can do so with the Omit utility type
const PublicPatient = ():  Omit<Patient, 'ssn'>[] 

https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys

we can also create a new type using the Pick or Omit utility types
type PublicPatient  = Omit<Patient, 'ssn'>
*/
export type NewPatient = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;