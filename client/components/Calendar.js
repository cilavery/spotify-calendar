import React, { Component } from 'react';
import dateFns from 'date-fns';
import EventPop from './EventPop';
import EventList from './EventList';

class Calendar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      today: new Date(),
      currentMonth: new Date(),
      selectedDate: new Date(),
      todaysEvents: {},
      showPopup: false
    }
  this.onDateClick = this.onDateClick.bind(this);
  this.onTodayClick = this.onTodayClick.bind(this);
  this.nextMonth = this.nextMonth.bind(this);
  this.prevMonth = this.prevMonth.bind(this);
  this.togglePopup = this.togglePopup.bind(this);
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

  renderCells() {
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
        days.push(
          <div className={`col cell ${!dateFns.isSameMonth(day, monthStart) ? "disabled" : dateFns.isSameDay(day, selectedDate) ? "selected" : ''}`} key={day} onClick={() => this.onDateClick(dateFns.parse(cloneDay))}>
          <span>{formattedDate}</span>
          <EventList currentDay={formattedEventsDate}/>
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
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        {
          this.state.showPopup
          ? <EventPop togglePopup={this.togglePopup} eventDate={this.state.selectedDate} />
          : null
        }
      </div>
    )
  }

}



export default Calendar
