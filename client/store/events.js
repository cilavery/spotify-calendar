import axios from 'axios';

//initial state
const initialState = {
  events: []
}

//action types
const GET_ALL_EVENTS = 'GET_ALL_EVENTS';
const ADD_EVENT = 'ADD_EVENT';

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

//reducer

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {...state, events: action.events}
    case ADD_EVENT:
      return {...state, events: [...state.events, action.event]}
    default:
      return state
  }
}


//thunks
export const getEvents = () => {
  return (dispatch) => {
    axios.get(`/api/event/`)
    .then(res => res.data)
    .then(events => {
      dispatch(getAllEvents(events))
    })
    .catch(err => console.error(err))
  }
}

export const postEvent = (body) => {
  return (dispatch) => {
    axios.post('/api/event', body)
    .then(res => res.data)
    .then(created => {
      dispatch(addEvent(created))
    })
    .catch(err => console.error(err))
  }
}
