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
      day: this.props.editDay,
      editedStart: null,
      editedEnd: null,
      editedDate: null
    }

    this.submitEvent = this.submitEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitEvent(e) {
    e.preventDefault();
    let eventStartTime;
    let eventEndTime;
    let body = {
      event: this.state.event,
    };

    if (this.state.editedDate) {
      //added 'Eastern Daylight Time to handle 4 hour offset of times set within 4 hours of midnight. Would have to dynamically update timezone based on user's location
      let newDate = new Date(`${this.state.editedDate} EDT`);
      body.date = newDate;
    } else {
      body.date = this.state.day
    }

    if (this.state.editedStart) {
      this.state.editedDate ? eventStartTime = new Date(this.state.editedDate) : eventStartTime = new Date(this.state.day);
      let startHour = this.parseHour(this.state.editedStart);
      let startMin = this.parseMin(this.state.editedStart);
      eventStartTime.setHours(startHour);
      eventStartTime.setMinutes(startMin);
      body.startTime = eventStartTime;
    }

    if (this.state.editedEnd) {
      this.state.editedDate ? eventEndTime = new Date(this.state.editedDate) : eventEndTime = new Date(this.state.day);
      let endHour = this.parseHour(this.state.editedEnd);
      let endMin = this.parseMin(this.state.editedEnd);
      eventEndTime.setHours(endHour);
      eventEndTime.setMinutes(endMin);
      body.endTime = eventEndTime;
    }

    let id = this.state.id
    this.props.onUpdateEvent(id, body);
    this.props.toggleEditView();
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
            <input className="timeSet" type="date" name="editedDate" onChange={this.handleChange}></input>
            <div className="start_end_time">
              <div className="timeSet">
                <p>Start Time:</p>
                <input type="time" name="editedStart" onChange={this.handleChange} defaultValue="13:00"></input>
              </div>
              <div className="timeSet">
                <p>End Time:</p>
                <input type="time" name="editedEnd" onChange={this.handleChange} defaultValue="13:00"></input>
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
