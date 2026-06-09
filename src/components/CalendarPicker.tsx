import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';

interface CalendarPickerProps {
  checkIn: string;
  checkOut: string;
  onChange: (dates: { checkIn: string; checkOut: string }) => void;
  onClose?: () => void;
}

export default function CalendarPicker({ checkIn, checkOut, onChange, onClose }: CalendarPickerProps) {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed, so 5)

  // Navigate months
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // Month metadata
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysArray = (year: number, month: number) => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Padding for offset
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  };

  const days = getDaysArray(currentYear, currentMonth);

  const handleDayClick = (dayDate: Date) => {
    const dateStr = dayDate.toISOString().split('T')[0];

    if (!checkIn || (checkIn && checkOut)) {
      // Set Check In
      onChange({ checkIn: dateStr, checkOut: '' });
    } else {
      // Check if clicked date is before checkIn
      if (new Date(dateStr) < new Date(checkIn)) {
        onChange({ checkIn: dateStr, checkOut: '' });
      } else {
        // Set Check Out
        onChange({ checkIn, checkOut: dateStr });
      }
    }
  };

  const isBetween = (dateStr: string) => {
    if (!checkIn || !checkOut) return false;
    const current = new Date(dateStr);
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return current > start && current < end;
  };

  const formatDateStrLabel = (str: string) => {
    if (!str) return 'Select';
    const d = new Date(str);
    return d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="absolute top-[calc(100%+8px)] left-0 right-0 md:left-auto md:w-[420px] bg-white border-2 border-booking-yellow rounded-lg shadow-xl py-4 px-4 z-[60] text-booking-text animate-fade-in text-sm">
      <div className="flex items-center justify-between border-b pb-2 mb-3">
        <span className="font-semibold flex items-center gap-1.5 text-booking-navy">
          <CalendarIcon size={16} />
          <span>Select Dates</span>
        </span>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 bg-blue-50 px-2 py-0.5 rounded text-xs text-booking-navy font-semibold">
            <span>In: {checkIn ? formatDateStrLabel(checkIn) : '—'}</span>
            <span className="text-blue-300">|</span>
            <span>Out: {checkOut ? formatDateStrLabel(checkOut) : '—'}</span>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-booking-muted hover:text-black hover:bg-gray-100 p-0.5 rounded transition">
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Month Navigator Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 rounded-full border hover:bg-gray-50 transition"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="font-bold text-booking-navy">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 rounded-full border hover:bg-gray-50 transition"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Weekdays Grid */}
      <div className="grid grid-cols-7 text-center font-semibold text-booking-muted text-[11px] uppercase mb-1">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {days.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;

          const isoStr = day.toISOString().split('T')[0];
          const isSelectedIn = isoStr === checkIn;
          const isSelectedOut = isoStr === checkOut;
          const isMiddle = isBetween(isoStr);
          const isPast = day < new Date(new Date().setHours(0,0,0,0));

          let dayClass = 'h-9 w-9 mx-auto flex items-center justify-center rounded-md font-medium transition cursor-pointer ';

          if (isPast) {
            dayClass += 'text-gray-300 cursor-not-allowed pointer-events-none';
          } else if (isSelectedIn) {
            dayClass += 'bg-booking-blue text-white font-bold rounded-l-md rounded-r-none';
          } else if (isSelectedOut) {
            dayClass += 'bg-booking-blue text-white font-bold rounded-r-md rounded-l-none';
          } else if (isMiddle) {
            dayClass += 'bg-blue-50 text-booking-navy font-semibold rounded-none hover:bg-blue-100';
          } else {
            dayClass += 'text-gray-700 hover:bg-gray-100';
          }

          return (
            <div
              key={isoStr}
              onClick={() => handleDayClick(day)}
              className={`${dayClass} text-xs`}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between pt-3 border-t text-xs text-booking-muted">
        <span className="italic">Click first for check-in, then check-out</span>
        <button
          type="button"
          onClick={() => onChange({ checkIn: '2026-06-06', checkOut: '2026-06-12' })}
          className="text-booking-blue font-bold hover:underline"
        >
          Reset to default Zurich Stay
        </button>
      </div>
    </div>
  );
}
