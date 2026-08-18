import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Holiday } from '../../../types/holiday';
import { holidayStartTime, toDate } from '../../../utils/dateUtils';

interface MobileSchoolHolidaysViewProps {
  schoolHolidays: Holiday[];
  personId: 1 | 2;
  onHolidaySelect?: (date: Date) => void;
}

export const MobileSchoolHolidaysView: React.FC<MobileSchoolHolidaysViewProps> = ({
  schoolHolidays,
  onHolidaySelect
}) => {
  const sortedHolidays = [...schoolHolidays].sort((a, b) => holidayStartTime(a) - holidayStartTime(b));

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900">Schulferien</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {sortedHolidays.map((holiday) => {
            const start = toDate(holiday.date ?? holiday.start);
            const end = toDate(holiday.endDate ?? holiday.end ?? holiday.date ?? holiday.start);
            if (!start) return null;
            return (
              <button
                key={`${holiday.name}-${holiday.start ?? holiday.date}`}
                onClick={() => onHolidaySelect?.(start)}
                className="w-full px-4 py-2 flex justify-between items-center hover:bg-gray-50 active:bg-gray-100 text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-900">
                    {format(start, 'dd.MM.')} - {format(end ?? start, 'dd.MM.yyyy', { locale: de })}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  {holiday.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
