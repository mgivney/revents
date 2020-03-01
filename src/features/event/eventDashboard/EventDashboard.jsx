import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import {connect} from 'react-redux'
import EventList from '../eventList/EventList'
import EventForm from '../eventForm/EventForm'
import cuid from 'cuid'
import {createEvent, updateEvent, deleteEvent} from '../eventActions'

const mapState = (state) => ({
    events: state.events
})

const actions = { createEvent, updateEvent, deleteEvent }

class EventDashboard extends Component {
    state = {
        isOpen: false,
        selectedEvent: null
    }

    handleCreateFormOpen = () => {
        this.setState({
            isOpen: true,
            selectedEvent: null
        })
    }
  
    handleFormCancel = () => {
        this.setState({
            isOpen: false
        })
    }
  
    handleCreateEvent = (newEvent) => {
        newEvent.id = cuid();
        newEvent.hostPhotoURL = '/assets/user.png';
        this.props.createEvent(newEvent)
        this.setState(({events})=>({
            isOpen: false
        }))
        
    }

    handleSelectEvent  = (event) => {
        this.setState({
            selectedEvent: event,
            isOpen: true
        })
    }
    
    handleUpdateEvent = (updatedEvent) => {
        this.props.updateEvent(updatedEvent)
        this.setState(({events})=> ({
            isOpen: false,
            selectedEvent: null
        }))

    }

    handleDeleteEvent = (id) => {
        this.props.deleteEvent(id)
    }

    render() {
        const {isOpen, selectedEvent} = this.state
        const {events} = this.props
        return (
                <Grid>
                    <Grid.Column width={10}>
                        <EventList events={events}
                            deleteEvent={this.handleDeleteEvent}
                            selectEvent={this.handleSelectEvent} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Button onClick={this.handleCreateFormOpen} positive content="Create Event" />
                        {isOpen && <EventForm 
                            key={selectedEvent ? selectedEvent.id : 0}
                            updateEvent={this.handleUpdateEvent}
                            selectedEvent={selectedEvent}
                            cancelFormOpen={this.handleFormCancel}
                            createEvent={this.handleCreateEvent} />}
                    </Grid.Column>
                    
                </Grid>
        )
    }
}

export default connect(mapState,actions)(EventDashboard)