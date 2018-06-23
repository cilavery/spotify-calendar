import React from 'react';
import Routes from './routes';
import Calendar from './components/Calendar'
import { Footer } from './components/Footer';

const App = () => {
    return (
      <div className="main">
        <h1 className="title">Fun Times Calendar</h1>
        <Calendar />
        <Footer />
      </div>
    )
}

export default App
