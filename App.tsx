import React, { useState } from 'react';

type ClassInfo = {
  professor: string;
  time: string;
  location: string;
};

type CalendarDay = {
  date: number;
  classInfo?: ClassInfo;
};

const Calendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  const daysInMonth = 30; // Mock month length
  const calendarDays: CalendarDay[] = Array.from({ length: daysInMonth }, (_, i) => ({ date: i + 1 }));

  const mockClassData: { [key: number]: ClassInfo } = {
    5: { professor: 'Prof. Smith', time: '9:00 - 10:30', location: 'Room 101' },
    12: { professor: 'Dr. Jones', time: '14:00 - 15:30', location: 'Room 205' },
    19: { professor: 'Prof. Brown', time: '11:00 - 12:30', location: 'Gym' },
    26: { professor: 'Prof. Davis', time: '16:00 - 17:30', location: 'Room 302' },
  };

  calendarDays.forEach(day => {
    if (mockClassData[day.date]) {
      day.classInfo = mockClassData[day.date];
    }
  });

  const handleDayClick = (day: CalendarDay) => {
    setSelectedDay(day);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Class Calendar</h1>

      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="text-center font-medium">{day}</div>
        ))}

        {calendarDays.map((day) => (
          <div
            key={day.date}
            className={`p-4 rounded-lg border border-gray-300 cursor-pointer hover:bg-blue-100 transition-colors ${
              selectedDay?.date === day.date ? 'bg-blue-200' : ''
            }`}
            onClick={() => handleDayClick(day)}
          >
            {day.date}
            {day.classInfo && <div className="text-sm text-blue-500">Class</div>}
          </div>
        ))}
      </div>

      {selectedDay && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">Day {selectedDay.date}</h2>
          {selectedDay.classInfo ? (
            <div>
              <p>
                <span className="font-medium">Professor:</span> {selectedDay.classInfo.professor}
              </p>
              <p>
                <span className="font-medium">Time:</span> {selectedDay.classInfo.time}
              </p>
              <p>
                <span className="font-medium">Location:</span> {selectedDay.classInfo.location}
              </p>
            </div>
          ) : (
            <p>No classes scheduled for this day.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;