import React, { useCallback, useState, useEffect } from 'react'
import { Calendar as ReactBigCalendar, globalizeLocalizer } from 'react-big-calendar'
import axios from 'axiosInstance.js';
import globalize from 'globalize'

const localizer = globalizeLocalizer(globalize)
export default function Calendar({ setModal, events, setEvents }) {
  const reservationsToEvents = useCallback((reservations) => {
    return reservations.map((r) => (
      {
        start: new Date(r.start),
        end: new Date(r.finish),
        title: r.title
      }
    ))
  }, [])

  useEffect(() => {
    axios.get('/reservations').then(response => {
      setEvents(reservationsToEvents(response.data))
    })
  }, [])

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  return <ReactBigCalendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    defaultView="month"
    style={{ height: "100vh" }}
    onSelectEvent={handleSelectEvent}
    onSelectSlot={(props) => setModal({ open: true, props })}
    selectable
  />
}
