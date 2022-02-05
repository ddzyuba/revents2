import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
//import { sampleData } from '../../../app/api/sampleData';

export default function EventDashboard() {
  //const [events, setEvents] = useState(sampleData);
  const { events } = useSelector(state => state.event);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
