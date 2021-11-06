import React from 'react';
import { Card, Header, Icon } from 'semantic-ui-react';
import { HealthCheckEntry, Diagnosis, } from '../types';
import HealthRatingBar from "../components/HealthRatingBar";

interface Props {
  entry: HealthCheckEntry
  diagnosisDetails?: Diagnosis[]
}

export const HealthCheckEntryComponent = ({entry, diagnosisDetails}: Props) => {

  console.log('diagnosisDetails----', diagnosisDetails);

  return (
    <Card fluid  >
      <Card.Content>
        <Card.Header>{entry.date} <Icon name='doctor' size="big" /></Card.Header>
        <Card.Meta>Specialist: {entry.specialist}</Card.Meta>
        <Card.Description>
          <Header as='h4' > Description</Header>
        {entry.description}
        </Card.Description>
        {/*The lower the number of the health rating, the better the health.
         Yes that seems counterintuitive but I am just using the pre-existing code that I forked. 
         and that is how they did it*/}
        <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
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

//<HealthRatingBar showText={false} rating={1} />
