import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import NavBar from '../components/NavBar';

const CalendarTasks = () => {
    
    const [ selectedDate, setSelectedDate] = useState( new Date())
  return (
    <div>
      <NavBar/>
      <h2>Calendar</h2>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <p>Selected Date: {selectedDate.toDateString()}</p>
    </div>
  )
}

export default CalendarTasks