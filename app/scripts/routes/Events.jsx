/** React Imports */
import React from 'react';
import EventsContainer from 'containers/Events';


class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <EventsContainer />
    );
  }
}

export default Events;
