import React from 'react';
import { HealthCheckEntryComponent, HospitalEntryComponent, OccupationalHealthEntryComponent } from '../Entries';
import { useStateValue } from '../state';
import { Entry, Diagnosis } from '../types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface Props {
  entry: Entry
}

export const EntryDetails = ({ entry }: Props) => {

  //const [{ patientInfo, diagnoses }, dispatch] = useStateValue();
  const [{ diagnoses },] = useStateValue();

  const populateDiagnosesDetails = (): Diagnosis[] => {
    const diagnosesDetailArr: Diagnosis[] = [];

    if (diagnoses && diagnoses.length > 0) {      
      entry.diagnosisCodes?.forEach(code => {
        const details = diagnoses.find(d => { return d.code == code; });
        (details !== undefined) && diagnosesDetailArr.push(details);
      });
      return diagnosesDetailArr;
    }
    return diagnosesDetailArr;
  };

  switch (entry.type) {
    case "Hospital":

      return <HospitalEntryComponent entry={entry} diagnosisDetails={populateDiagnosesDetails()} />;
    case "HealthCheck":

      return <HealthCheckEntryComponent entry={entry} diagnosisDetails={populateDiagnosesDetails()} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthEntryComponent entry={entry} diagnosisDetails={populateDiagnosesDetails()} />;

    default:
      return assertNever(entry);
  }

};
