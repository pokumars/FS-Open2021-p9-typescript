import React from 'react';
//import { Card, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { Card, Header, Icon } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

interface Props {
  entry: HospitalEntry
}

export const HospitalEntryComponent = ({ entry }: Props) => {
  return (
    <Card fluid  >
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

      </Card.Content>
    </Card>
  );
};