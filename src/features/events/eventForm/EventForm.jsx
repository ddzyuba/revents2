/* global google */
import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import { categoryData } from '../../../app/api/categoryOptions';

export default function EventForm({
  match,
  history
}) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id));

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: {
      address: '',
      latLng: null
    },
    venue: {
      address: '',
      latLng: null
    },
    date: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required('City is required')
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Venue is required')
    }),
    date: Yup.string().required(),
  });

  //const [values, setValues] = useState(initialValues);

  /*function handleFormSubmit() {
    selectedEvent
      ? dispatch(updateEvent({ ...selectedEvent, ...values }))
      : dispatch(createEvent({
          ...values,
          id: cuid(),
          hostedBy: 'Bob',
          attendees: [],
          hostPhotoURL: '/assets/user.png',
        }));
    history.push('/events');
  }*/

  /*function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }*/

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(createEvent({
                ...values,
                id: cuid(),
                hostedBy: 'Bob',
                attendees: [],
                hostPhotoURL: '/assets/user.png',
              }));
          history.push('/events');
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Event Details' />
            <MyTextInput 
              name='title'
              placeholder='Event title'
            />
            <MySelectInput 
              name='category'
              placeholder='Category'
              options={categoryData}
            />
            <MyTextArea
              name='description'
              placeholder='Description'
              rows={3}
            />
            <Header sub color='teal' content='Event Location Details' />
            <MyPlaceInput 
              name='city'
              placeholder='City'
            />
            <MyPlaceInput 
              name='venue'
              disabled={!values.city.latLng}
              placeholder='Venue'
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['establishment']
              }}
            />
            <MyDateInput 
              name='date'
              placeholderText='Event date'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:m a'
            />
            <Button 
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit' 
              floated='right' 
              positive 
              content='Submit' 
            />
            <Button
              disabled={isSubmitting}
              as={Link} to='/events'
              type='submit'
              floated='right'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
