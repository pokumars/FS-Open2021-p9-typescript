import React from 'react';
import { Card, Header, Icon } from 'semantic-ui-react';
import { HealthCheckEntry,  } from '../types';
import HealthRatingBar from "../components/HealthRatingBar";

interface Props {
  entry: HealthCheckEntry
}

export const HealthCheckEntryComponent = ({entry}: Props) => {
  return (
    <Card fluid  >
      <Card.Content>
        <Card.Header>{entry.date} <Icon name='doctor' size="big" /></Card.Header>
        <Card.Meta>Specialist: {entry.specialist}</Card.Meta>
        <Card.Description>
          <Header as='h4' > Description</Header>
        {entry.description}
        </Card.Description>
        <HealthRatingBar showText={false} rating={entry.healthCheckRating} />

      </Card.Content>
    </Card>
  );
};

//<HealthRatingBar showText={false} rating={1} />
