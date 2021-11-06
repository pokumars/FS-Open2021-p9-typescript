import React from 'react';
import { Card, Header, Icon } from 'semantic-ui-react';
import { Diagnosis, HospitalEntry } from '../types';

interface Props {
  entry: HospitalEntry,
  diagnosisDetails?: Diagnosis[]
}

export const HospitalEntryComponent = ({ entry, diagnosisDetails }: Props) => {

  console.log('diagnosisDetails----', diagnosisDetails);
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name='hospital' size="big" /></Card.Header>
        <Card.Meta>Specialist: {entry.specialist}</Card.Meta>
        <Card.Description>
          <Header as='h4' > Description</Header>
        {entry.description}
        </Card.Description>
        {
          entry.discharge && 
          <Card.Description>
          <b>discharge date</b>: {entry.discharge.date} <br />
          <b>notes</b>- {entry.discharge.criteria}
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