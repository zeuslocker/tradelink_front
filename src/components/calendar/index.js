import React, { useCallback, useState, useMemo } from 'react'
import { Calendar as ReactBigCalendar, globalizeLocalizer } from 'react-big-calendar'
import globalize from 'globalize'

const localizer = globalizeLocalizer(globalize)
export default function Calendar({ setModal }) {
  const [myEvents, setEvents] = useState([])

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [setEvents]
  )

  return <ReactBigCalendar
    localizer={localizer}
    events={myEvents}
    startAccessor="start"
    endAccessor="end"
    defaultView="month"
    style={{ height: "100vh" }}
    onSelectEvent={handleSelectEvent}
    onSelectSlot={(props) => setModal({ open: true, props })}
    selectable
  />
}
