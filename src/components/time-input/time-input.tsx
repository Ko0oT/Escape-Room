import { ChangeEvent } from 'react';
import { Today, Tomorrow } from '../../types/types';

type TimeInputProps = {
  date: string;
  data: Today | Tomorrow;
  handleTimeInputChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function TimeInput({date, data, handleTimeInputChange}: TimeInputProps) {
  return (
    <label className="custom-radio booking-form__date">
      <input
        type="radio"
        id={date}
        name="time"
        required
        disabled={!data.isAvailable}
        value={data.time}
        onChange={handleTimeInputChange}
      />
      <span className="custom-radio__label">{data.time}</span>
    </label>
  );
}

export default TimeInput;
