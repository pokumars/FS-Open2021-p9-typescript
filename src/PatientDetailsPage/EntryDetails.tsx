import React from 'react';
import { Divider } from 'semantic-ui-react';
import { HospitalEntryComponent } from '../Entries';
import { Entry } from '../types';

interface Props {
entry :Entry
}

export const EntryDetails = ({entry}: Props) => {
  switch (entry.type) {
    case "Hospital":
      
      return <HospitalEntryComponent entry={entry} />;
  
    default:
      return (
        <div  >
        <Divider horizontal >{entry.date}</Divider>
        {entry.date}- {entry.description}
        <ul>
          {entry.diagnosisCodes?.map(d => <li key={d} >{d}</li>)} 
        </ul>
        
      </div>
      );
  }

};
