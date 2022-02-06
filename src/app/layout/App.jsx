import React from 'react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';

export default function App() {
  const { key } = useLocation();
  // key is used to fix an issue
  // when we edit an event in a form, it's populated
  // when we clock on Create Event - the form is also populated
  // the key property makes the form empty when we click on the Create Event from
  // Manage Event page

  return (
    <>
      <ModalManager />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route exact path='/sandbox' component={Sandbox} />
              <Route path='/events/:id' component={EventDetailedPage} />
              <Route path={['/createEvent', '/manage/:id']} component={EventForm} key={key} />
            </Container>
          </>
        )}
      />
    </>
  );
}
