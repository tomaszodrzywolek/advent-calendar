import React, { useEffect, useState } from 'react';
import './Calendar.css';

function Calendar({ openModal }) {
  const doors = Array.from({ length: 24 }, (_, i) => i + 1);
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    const now = new Date();
    const polishOffset = new Date().getTimezoneOffset() + 60; // Offset from UTC+1 (CET)
    const polishTime = new Date(now.getTime() + polishOffset * 60 * 1000);

    if (polishTime.getMonth() === 11) { // December is month 11 in JavaScript Date
        setCurrentDay(polishTime.getDate());
      }
    }, []);


  return (
    <div className="calendar-container">
      {doors.map((day) => (
        <div
          key={day}
          className={`day ${day <= currentDay ? 'enabled' : 'disabled'}`}
          onClick={day <= currentDay ? openModal : null} // Only allow click if enabled
        >
          {day}
        </div>
      ))}
    </div>
  );
}

export default Calendar;