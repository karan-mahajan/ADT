import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import { Button, Calender } from '..';
import './datepicker.scss';
import { DatepickerProps } from '../../utils/types';

function Datepicker({
  applyFilters,
  setStartDate,
  startDate,
}: DatepickerProps) {
  const [openCalender, setOpenCalender] = useState<boolean>(false);

  // function to change the start date
  const onStartDateChange = (value: Date) => {
    setStartDate(value);
    setOpenCalender(true);
  };

  // function to apply the filters
  const onClickFilters = () => {
    // TODO:: validation for dates
    if (applyFilters) applyFilters();
  };
  return (
    <div className="date-picker-container">
      <div className="date-picker-body">
        <div className="filters-content">
          <span className="filters-content-label">Date of Birth</span>
          <DatePicker
            onChange={onStartDateChange}
            value={startDate}
            className="date-picker-custom"
            clearIcon={null}
            calendarIcon={<Calender />}
            formatMonth={(locale, date) => date.toLocaleString('en-us', { month: 'short' })}
            minDetail="decade"
            navigationLabel={({ date }) =>
              `${date.toLocaleString('en-us', { month: 'short' })} ${date.getFullYear()}`
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Datepicker;
