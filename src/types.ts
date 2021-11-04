export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealthCheckRatingEnum {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "Critical" = 3,
}

interface Discharge {
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
  healthCheckRating: HealthCheckRatingEnum;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryTypeNames.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave
}

export interface HospitalEntry extends BaseEntry {
  type: EntryTypeNames.Hospital;
  discharge?: Discharge
}

//https://fullstackopen.com/en/part9/react_with_types#full-entries
export type Entry = 
| HealthCheckEntry 
| HospitalEntry
| OccupationalHealthcareEntry;

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;
export type HealthCheckEntryFormValues  = Omit<HealthCheckEntry, "id">;
export type OccupationalHealthcareEntryFormValues = Omit<Entry, "id">;

//export type EntryFormValues = UnionOmit<Entry, 'id'>;
export type EntryFormValues = 
| HospitalEntryFormValues 
| HealthCheckEntryFormValues
| OccupationalHealthcareEntryFormValues;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}
