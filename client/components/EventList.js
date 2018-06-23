import React, { Component } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import { getEvents } from '../store';

class EventList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todaysEvents: []
    }
  }

  componentDidMount() {
    this.props.loadAllEvents();
  }

  renderEvents() {
    let dayEvents = this.props.todaysEvents;
    let eventArr = [];
    let match = dayEvents && dayEvents.filter(event => {
      let formatEvents = dateFns.format(event.date, 'MM DD YYYY')
      return dateFns.isEqual(this.props.currentDay, formatEvents)
    }).map(eventListing => {
      let eventArr = []
      eventArr.push(eventListing.startTime, ' - ', eventListing.endTime, ' ',eventListing.event)
      return eventArr
    })

    return (
      <div>
      {
        match && match.map(event => {
          return (
            <div className="day_events" key={event}>
              <p className="event-list">{event}</p>
            </div>
          )
        })
      }
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderEvents()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    todaysEvents: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllEvents: function() {
      dispatch(getEvents())
    }
  }
}

export default EventList = connect(mapStateToProps, mapDispatchToProps)(EventList)
