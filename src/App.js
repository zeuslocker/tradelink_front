import React, { useState } from 'react'
import './App.scss';
import Calendar from 'components/Calendar'
import ScheduleModal from 'components/ScheduleModal';
import "react-big-calendar/lib/css/react-big-calendar.css";

function App() {
  const [events, setEvents] = useState([])
  const [modal, setModal] = useState({ open: false, props: {} });

  return (
    <div className="App">
      <Calendar
        setModal={setModal}
        events={events}
        setEvents={setEvents}
      />
      <ScheduleModal
        modalOpen={modal.open}
        setModal={setModal}
        date={modal.props}
        events={events}
        setEvents={setEvents}
      />
    </div>
  );
}

export default App;
