import React, {Component, Fragment} from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage'
import EventDashboard from '../../features/event/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/navBar/NavBar';
import EventDetailedPage from '../../features/event/eventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/peopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/userDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/appSettings/SettingsDashboard';
import EventForm from '../../features/event/eventForm/EventForm';
import TestComponent from '../../features/testarea/TestComponent';

class App extends Component{
  render() {
    return (
      <Fragment>
        <Route exact path='/' component={HomePage} />
        <Route path="/(.+)"
               render={() => (
                <Fragment>
                  <NavBar />
                  <Container className="main">
                    <Switch key={this.props.location.key}>
                    <Route exact path='/events' component={EventDashboard} />
                    <Route path='/events/:id' component={EventDetailedPage} />
                    <Route path='/people' component={PeopleDashboard} />
                    <Route path='/profile/:id' component={UserDetailedPage} />
                    <Route path='/settings' component={SettingsDashboard} />
                    <Route path={['/createEvent','/manage/:id']} component={EventForm} />
                    <Route path='/test' component={TestComponent} />
                    </Switch>
                  </Container>
                </Fragment>
               )} />
      </Fragment>

    );
    

  }
}

export default withRouter(App);