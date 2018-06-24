import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { postEvent, deleteEventThunk } from '../store';
import dateFns from 'date-fns';
import { Delete } from './Delete';

class EventPop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: '',
      events: [],
      startTime: 0,
      endTime: 0,
      date: this.props.eventDate
    }

    this.submitEvent = this.submitEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.exitPopup = this.exitPopup.bind(this);
  }

  submitEvent(e) {
    e.preventDefault();
    let eventStartTime = new Date(this.state.date);
    let eventEndTime = new Date(this.state.date);
    let startHour = this.parseHour(this.state.startTime);
    let startMin = this.parseMin(this.state.startTime);
    let endHour = this.parseHour(this.state.endTime);
    let endMin = this.parseMin(this.state.endTime);

    eventStartTime.setHours(startHour);
    eventStartTime.setMinutes(startMin);
    eventEndTime.setHours(endHour);
    eventEndTime.setMinutes(endMin);

    let body = {
      event: this.state.event,
      startTime: eventStartTime,
      endTime: eventEndTime,
      date: this.state.date
    }

    this.props.onAddEvent(body)
    this.props.togglePopup();
  }

  parseHour(timeStr) {
    let idx = 0;
    let hour = ''
    if (timeStr === 0) {
      return 13
    } else if (timeStr.indexOf(':') === -1) {
      return Number(timeStr)
    } else {
      idx = timeStr.indexOf(':')
      hour = timeStr.slice(0,idx)
    }
    return Number(hour)
  }

  parseMin(timeStr) {
    if (timeStr === 0) {
      return 0
    } else {
      let idx = timeStr.indexOf(':')
      let minutes = timeStr.slice(idx+1)
      return Number(minutes)
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  exitPopup() {
    this.props.togglePopup();
  }

 renderEvents(events) {
   let formattedDay = dateFns.format(this.props.eventDate, 'MM-DD-YYYY');
   let daysEvents = events.filter(event => {
     let formattedEventDay = dateFns.format(event.date, 'MM-DD-YYYY')
     return formattedDay === formattedEventDay
   })

   if (!daysEvents.length) {
    return <div><em>No events planned for today</em></div>
   } else {
    return daysEvents.map((e,idx) => {
      let start = dateFns.format(e.startTime, 'h:mm a')
      let end = dateFns.format(e.endTime, 'h:mm a')
      return (
        <div className="event-list" key={idx}>
          {`${start}-${end}`} <strong>{e.event}</strong>
          <Link to={`/event/delete/${e.id}`} onClick={() => this.props.onDeleteEvent(e.id)} className="delete-link">delete</Link>
        </div>
      )
    })
   }
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <h3>Today's Events</h3>
          {<div>{this.renderEvents(this.props.allEvents)}</div>}
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
            <button onClick={this.exitPopup} id="exit-btn">Exit</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allEvents: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddEvent(body) {
      dispatch(postEvent(body))
    },
    onDeleteEvent(id) {
      dispatch(deleteEventThunk(id))
    }
  }
}

export default EventPop = connect(mapStateToProps, mapDispatchToProps)(EventPop)
