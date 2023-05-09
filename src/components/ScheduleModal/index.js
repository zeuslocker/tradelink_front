import React, { useState, useCallback } from 'react';
import styles from './index.module.scss';
import Select from "react-auto-scroll-time-select";
import moment from 'moment';

export default function ScheduleModal({ modalOpen, setModal, date }) {
  const [startTime, setStartTime] = useState()
  const [finishTime, setFinishTime] = useState()
  const setStart = useCallback((option) => {
    setStartTime(option)
    if (option?.value && (option.value >= finishTime?.value || finishTime?.value == null)) {
      const time = moment(option.value, 'HH:mm').add(15, 'minutes').format('HH:mm')
      setFinishTime({ label: time, value: time })
    }
  }, [startTime, setStartTime, finishTime, setFinishTime])
  const setFinish = useCallback((option) => {
    setFinishTime(option)
    if (option?.value && (option.value <= startTime?.value || startTime?.value == null)) {
      const time = moment(option.value, 'HH:mm').subtract(15, 'minutes').format('HH:mm')
      setStartTime({ label: time, value: time })
    }
  }, [startTime, setStartTime, finishTime, setFinishTime])

  return modalOpen ? <div className={styles.modalWindow}>
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ${styles.modal}`}>
          {/*header*/}
          <div className="flex items-start justify-between p-1 border-b border-solid border-slate-200 rounded-t">
            <button
              className="p-1 px-3 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setModal({ open: false })}
            >
              ×
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <h2 className='text-2xl mb-5'>{date.start.toDateString()}</h2>
            <div className='mb-5'>
              <span>
                Start
              </span>
              <Select onChange={setStart} span={15} value={startTime} disabledOptions={['24:00', '23:45', '23:30', '23:15', '23:00']} />
            </div>
            <div>
              <span>
                Finish
              </span>
              <Select onChange={setFinish} span={15} value={finishTime} disabledOptions={['24:00', '23:45', '23:30', '23:15', '00:00']} />
            </div>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setModal({ open: false })}
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setModal({ open: false })}
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div> : null
}
