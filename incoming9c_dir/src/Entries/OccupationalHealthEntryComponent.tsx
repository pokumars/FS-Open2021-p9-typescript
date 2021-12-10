import React from 'react';
import { Card, Header, Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntry, Diagnosis } from '../types';


interface Props {
  entry: OccupationalHealthcareEntry,
  diagnosisDetails?: Diagnosis[]
}

export const OccupationalHealthEntryComponent = ({ entry, diagnosisDetails }: Props) => {

  //console.log('diagnosisDetails----', diagnosisDetails);
  return (
    <Card fluid  >
      <Card.Content>
        <Card.Header>{entry.date} <Icon name='doctor' size="big" /> {entry.employerName}</Card.Header>
        <Card.Meta>Specialist: {entry.specialist}</Card.Meta>
        <Card.Description>
          <Header as='h4' > Description</Header>
          {entry.description}
        </Card.Description>

        {
          entry.sickLeave &&
          <Card.Description>
            <b>sick leave from</b> {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
          </Card.Description>
        }
        <Header as='h4' > Diagnoses</Header>
        {
          
          diagnosisDetails && diagnosisDetails.map((d, index) => {
            return <p key={`${d.code}${index}`} >{d.code}: {d.name}</p>;
          })
        }
      </Card.Content>
    </Card>
  );
};
