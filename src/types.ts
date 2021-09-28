export interface Diagnosis  {
  code: string
  name: string
  latin?: string
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: string
  occupation: string
}

/*Utility types are so useful in typescript

The Pick utility type allows us to choose which fields of an existing type we want to use.
So in order to return the DiaryEntry without the 'comment' field, we can do this
const NonSensitivePatient = (): Pick<Patient,  'id' | 'dateOfBirth' | 'name' | 'gender'| 'occupation'>[] => {}

But since we are only trying to remove the 'comment' field, we can do so with the Omit utility type
const NonSensitivePatient = ():  Omit<Patient, 'ssn'>[] 

https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys

we can also create a new type using the Pick or Omit utility types
type NonSensitivePatient  = Omit<Patient, 'ssn'>
*/
export type NonSensitivePatient  = Omit<Patient, 'ssn'>;