import React from 'react';
import { TTimeRange } from '../../types/types';
import './TimeRangeButtons.scss';

type TTimeRangeButtonProps = {
  activeRange: TTimeRange;
  setActiveRange: React.Dispatch<React.SetStateAction<TTimeRange>>;
};

const TimeRangeButtons: React.FC<TTimeRangeButtonProps> = ({ activeRange, setActiveRange }) => {
  return (
    <ul className="time-range-buttons">
      <li>
        <button className={activeRange === 'short_term' ? 'active' : ''} onClick={() => setActiveRange('short_term')}>
          This Month
        </button>
      </li>
      <li>
        <button className={activeRange === 'medium_term' ? 'active' : ''} onClick={() => setActiveRange('medium_term')}>
          Last 6 Months
        </button>
      </li>
      <li>
        <button className={activeRange === 'long_term' ? 'active' : ''} onClick={() => setActiveRange('long_term')}>
          All Time
        </button>
      </li>
    </ul>
  );
};

export default TimeRangeButtons;
