import axios from 'axios';

//initial state
const initialState = {
  events: []
}

//action types
const GET_ALL_EVENTS = 'GET_ALL_EVENTS';
const ADD_EVENT = 'ADD_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';

//action creator
const getAllEvents = events => {
  return {
    type: GET_ALL_EVENTS,
    events
  }
}

const addEvent = event => {
  return {
    type: ADD_EVENT,
    event
  }
}

const deleteEvent = eventId => {
  return {
    type: DELETE_EVENT,
    eventId
  }
}

const updateEvent = event => {
  return {
    type: UPDATE_EVENT,
    event
  }
}

//reducer

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {...state, events: action.events}
    case ADD_EVENT:
      return {...state, events: [...state.events, action.event]}
    case DELETE_EVENT:
      let filteredEvents = state.events.filter(event => event.id !== action.eventId)
      return {...state, events: filteredEvents}
    case UPDATE_EVENT:
      let updateEvents = state.events.map(event => {
        return event.id === action.event.id ? action.event : event
      })
      return {...state, events: updateEvents}
    default:
      return state
  }
}


//thunks
export const getEvents = () => {
  return (dispatch) => {
    axios.get(`/api/event/`)
    .then(res => res.data)
    .then(events => dispatch(getAllEvents(events)))
    .catch(err => console.error(err))
  }
}

export const postEvent = (body) => {
  return (dispatch) => {
    axios.post('/api/event', body)
    .then(res => res.data)
    .then(created => dispatch(addEvent(created)))
    .catch(err => console.error(err))
  }
}

export const deleteEventThunk = (eventId) => {
  return (dispatch) => {
    axios.delete(`/api/event/delete/${eventId}`)
    .then(() => dispatch(deleteEvent(eventId)))
    .catch(err => console.error(err))
  }
}

export const updateEventThunk = (eventId, body) => {
  return (dispatch) => {
    axios.put(`/api/event/update/${eventId}`, body)
    .then(updated => {
      dispatch(updateEvent(updated.data.event))
    })
    .catch(err => console.error(err))
  }
}
