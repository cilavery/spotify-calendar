import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postEvent } from '../store';
import dateFns from 'date-fns';

class EventPop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      startTime: 0,
      endTime: 0,
      date: dateFns.format(this.props.eventDate, 'MM DD YYYY')
    }

    this.submitEvent = this.submitEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.exitPopup = this.exitPopup.bind(this);
  }

  componentDidMount() {
    let allEvents = this.props.events;
    let formatCurrDate = dateFns.format(this.props.eventDate, 'MM DD YYYY')
    let eventArr = [];
    let match = allEvents && allEvents.filter(event => {
      let formatEvents = dateFns.format(event.date, 'MM DD YYYY')
      return dateFns.isEqual(formatCurrDate, formatEvents)
    }).map(eventListing => {
      let eventArr = []
      eventArr.push(eventListing.startTime, ' - ', eventListing.endTime, ' ',eventListing.event)
      return eventArr
    })

    this.setState({
      events: match
    })
  }

  submitEvent(e) {
    e.preventDefault();
    this.props.togglePopup();
    this.props.onAddEvent(this.state)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  exitPopup() {
    this.props.togglePopup();
  }

  renderEvents() {
    let eventsArr = [];
    let plannedEvents = this.state.events;
    for (let i = 0; i < plannedEvents.length; i++) {
      eventsArr.push(
        <div key={i}>
          {plannedEvents[i]}
        </div>
      )
    }
    return <div>{eventsArr}</div>
  }

  render() {


    return (
      <div className="popup">
        <div className="popup_inner">
          <h3>Today's Events</h3>
          {
            this.state.events.length > 0
            ? <div>{this.renderEvents()}</div>
            : <div><em>No events planned for today</em></div>
          }

          <h3>Add A New Event</h3>
          <form className="event_time" onSubmit={this.submitEvent}>
            <input className="timeSet" type="text" placeholder="Event Name" name="event" onChange={this.handleChange}></input>
            <div className="start_end_time">
              <div className="timeSet">
                <p>Start Time</p>
                <input type="time" name="startTime" onChange={this.handleChange} defaultValue="13:00"></input>
              </div>
              <div className="timeSet">
                <p>End Time</p>
                <input type="time" name="endTime" onChange={this.handleChange} defaultValue="13:00"></input>
              </div>
            </div>
            <button type="submit">Add Event</button>
          </form>
            <button onClick={this.exitPopup}>Exit</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddEvent(body) {
      dispatch(postEvent(body))
    }
  }
}

export default EventPop = connect(mapStateToProps, mapDispatchToProps)(EventPop)
