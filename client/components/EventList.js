import React, { Component } from 'react';
import dateFns from 'date-fns';
import { getEvents } from '../store';

class EventList extends Component {

  renderEvents(events) {
    return events.map((e,idx) => {
      let start = dateFns.format(e.startTime, 'h:mm a')
      let end = dateFns.format(e.endTime, 'h:mm a')
      return (
        <div className="event-list" key={idx}>
          {`${start}-${end}`} <strong>{e.event}</strong>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderEvents(this.props.dayEvents)}
      </div>
    )
  }

}

export default EventList
