import React, { Component } from 'react';
import dateFns from 'date-fns';
import EventPop from './EventPop';
import EventList from './EventList';
import { connect } from 'react-redux';
import { getEvents } from '../store';


class Calendar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      today: new Date(),
      currentMonth: new Date(),
      selectedDate: new Date(),
      showPopup: false
    }
  this.onDateClick = this.onDateClick.bind(this);
  this.onTodayClick = this.onTodayClick.bind(this);
  this.nextMonth = this.nextMonth.bind(this);
  this.prevMonth = this.prevMonth.bind(this);
  this.togglePopup = this.togglePopup.bind(this);
  }

  componentDidMount() {
    this.props.loadAllEvents();
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </span>
        </div>
        <div className="col col-center today" onClick={() => this.onTodayClick(this.state.today)}>
            today
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    )
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      )
    }

    return <div className="days row">{days}</div>
  }

  getEventsForDay(theDay, allEvents) {
    let formattedDay = dateFns.format(theDay, 'MM-DD-YYYY')
    return allEvents.filter(event => {
      let formattedEvent = dateFns.format(event.date, 'MM-DD-YYYY')
      return formattedEvent === formattedDay
    })
  }

  renderCells(allEvents) {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";
    let formattedEventsDate = "";
    let matchedEvents = [];

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        formattedEventsDate = dateFns.format(day, 'MM DD YYYY');

        const cloneDay = day;

        const dayEvents = this.getEventsForDay(day, allEvents);

        days.push(
          <div className={`col cell ${!dateFns.isSameMonth(day, monthStart) ? "disabled" : dateFns.isSameDay(day, selectedDate) ? "selected" : ''}`} key={day} onClick={() => this.onDateClick(dateFns.parse(cloneDay))}>
          <span>{formattedDate}</span>
          <EventList dayEvents={dayEvents}/>
          </div>
        )
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      )
      days = [];
    }

    return <div className="body">{rows}</div>
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  onTodayClick() {
    this.setState({
      currentMonth: new Date(),
      selectedDate: new Date()
    })
  }

  onDateClick(day) {
    this.setState({
      selectedDate: day
    })
    this.togglePopup();
  }


  nextMonth() {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    })
  }

  prevMonth() {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    })
  }

  render() {
    console.log('props after update in Calendar.js', this.props)
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells(this.props.allEvents)}
        {
          this.state.showPopup
          ? <EventPop togglePopup={this.togglePopup} eventDate={this.state.selectedDate} />
          : null
        }
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
    loadAllEvents: function() {
      dispatch(getEvents())
    }
  }
}

//export default Calendar
export default Calendar = connect(mapStateToProps, mapDispatchToProps)(Calendar)

