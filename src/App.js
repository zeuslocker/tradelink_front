import React, { useState, useCallback } from 'react'
import './App.scss';
import Calendar from 'components/Calendar'
import ScheduleModal from 'components/ScheduleModal';
import "react-big-calendar/lib/css/react-big-calendar.css";

function App() {
  const [modal, setModal] = useState({ open: false, props: {} });

  return (
    <div className="App">
      <Calendar setModal={setModal} />
      <ScheduleModal modalOpen={modal.open} setModal={setModal} date={modal.props} />
    </div>
  );
}

export default App;
