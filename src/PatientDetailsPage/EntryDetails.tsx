import React from 'react';
import { HealthCheckEntryComponent, HospitalEntryComponent, OccupationalHealthEntryComponent } from '../Entries';
import { Entry } from '../types';

/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface Props {
entry :Entry
}

export const EntryDetails = ({entry}: Props) => {
  switch (entry.type) {
    case "Hospital":
      
      return <HospitalEntryComponent entry={entry} />;
    case "HealthCheck":
    
      return <HealthCheckEntryComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthEntryComponent entry={entry}/>;
  
    default:
      return assertNever(entry);
  }

};
