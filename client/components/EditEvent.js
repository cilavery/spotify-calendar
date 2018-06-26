import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEventThunk } from '../store';
import history from '../history';

class EditEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.editId,
      event: this.props.editName,
      start: this.props.editStart,
      end: this.props.editEnd,
      day: this.props.editDay
    }

    this.submitEvent = this.submitEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitEvent(e) {
    e.preventDefault();
    let eventStartTime = new Date(this.state.day);
    let eventEndTime = new Date(this.state.day);
    let startHour = this.parseHour(this.state.start);
    let startMin = this.parseMin(this.state.start);
    let endHour = this.parseHour(this.state.end);
    let endMin = this.parseMin(this.state.end);

    eventStartTime.setHours(startHour);
    eventStartTime.setMinutes(startMin);
    eventEndTime.setHours(endHour);
    eventEndTime.setMinutes(endMin);

    let body = {
      event: this.state.event,
      startTime: eventStartTime,
      endTime: eventEndTime,
      date: this.state.day
    }
    let id = this.state.id
    this.props.onUpdateEvent(id, body);
    history.push('/')
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

  //if user changes hours
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
         <form className="event_time" onSubmit={this.submitEvent}>
            <input className="timeSet" type="text" name="event" onChange={this.handleChange} value={this.state.event}></input>
            <input className="timeSet" type="date" name="day" onChange={this.handleChange} defaultValue={this.state.day}></input>
            <div className="start_end_time">
              <div className="timeSet">
                <p>Start Time:</p>
                <input type="time" name="start" onChange={this.handleChange} defaultValue="13:00"></input>
              </div>
              <div className="timeSet">
                <p>End Time:</p>
                <input type="time" name="end" onChange={this.handleChange} defaultValue="13:00"></input>
              </div>
            </div>
            <button type="submit">Update Event</button>
          </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateEvent(id, body) {
      dispatch(updateEventThunk(id, body))
    }
  }
}

export default EditEvent = connect(null, mapDispatchToProps)(EditEvent)
