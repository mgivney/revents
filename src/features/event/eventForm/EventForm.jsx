import React, { Component } from 'react'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import {connect} from 'react-redux'
import {createEvent, updateEvent} from '../eventActions'
import {reduxForm, Field} from 'redux-form'
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id
  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }
  if(eventId && state.events.length > 0){
    event = state.events.filter(e=>e.id === eventId)[0]
  }
  return { event }
}

const actions = {createEvent, updateEvent}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

class EventForm extends Component {

    handleFormSubmit = evt => {
        evt.preventDefault()
        if(this.state.id){
            this.props.updateEvent(this.state)
            this.props.history.push(`/events/${this.state.id}`)
        }else{
          const newEvent = {
            ...this.state, 
            id: cuid(),
            hostPhotoURL: '/assets/user.png'
          }
          this.props.createEvent(newEvent)
          this.props.history.push(`/events}`)
        }
    }

    render() {
        return (
          <Grid>
            <Grid.Column width={10}>
                <Segment>
                  <Header sub color='teal' content='Event Details' />
                  <Form onSubmit={this.handleFormSubmit} autoComplete='off'>
                    <Field  name='title' 
                            component={TextInput} 
                            placeholder='Event Name'/>
                    <Field  name='category' 
                            component={SelectInput} 
                            options={category} 
                            placeholder='Category'/>
                    <Field  name='description' 
                            component={TextArea} 
                            placeholder='Tell us about your event'
                            rows='3'/>
                    <Header sub color='teal' content='Event Location Details' />
                    <Field  name='city' 
                            component={TextInput} 
                            placeholder='City'/>
                    <Field  name='venue' 
                            component={TextInput} 
                            placeholder='Event Venue'/>
                    <Field  name='date' 
                            component={TextInput} 
                            placeholder='Event Date'/>
                    <Button positive type="submit">
                      Submit
                    </Button>
                    <Button type="button" 
                            onClick={this.props.history.goBack}>Cancel</Button>
                  </Form>
                </Segment>
            </Grid.Column>
          </Grid>

        )
    }
}
export default connect(mapState,actions)(reduxForm({form: 'eventForm'})(EventForm));