import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserEventsArray } from '../../Redux/user/user.selectors';
import { loadUserEvents } from '../../Redux/user/user.actions';
import { UserEvents } from '../../Redux/user/user.reducer';
import { addZero } from '../../lib/utils';
import EventItem from '../Event-Item/Event-item.component';
import './Calendar.styles.css';

const createDateKey = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${year}-${addZero(month)}-${addZero(day)}`;
};

const groupEventsByDay = (events: UserEvents[]) => {
  const groups: Record<string, UserEvents[]> = {};

  const addToGroup = (dateKey: string, event: UserEvents) => {
    if (groups[dateKey] === undefined) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
  };

  events.forEach((event) => {
    const dateStartKey = createDateKey(new Date(event.dateStart));
    const dateEndKey = createDateKey(new Date(event.dateEnd));

    addToGroup(dateStartKey, event);

    if (dateEndKey !== dateStartKey) {
      addToGroup(dateEndKey, event);
    }
  });
  return groups;
};

const Calendar: React.FC = () => {
  const events = useSelector(selectUserEventsArray);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserEvents());
  }, []);

  let groupedEvents: ReturnType<typeof groupEventsByDay> | undefined;
  let sortedGroupKeys: string[] | undefined;

  if (events.length) {
    groupedEvents = groupEventsByDay(events);
    sortedGroupKeys = Object.keys(groupedEvents).sort(
      (date1, date2) => +new Date(date2) - +new Date(date1)
    );
  }

  return groupedEvents && sortedGroupKeys ? (
    <div className="calendar">
      {sortedGroupKeys.map((dayKey) => {
        const events = groupedEvents ? groupedEvents[dayKey] : [];
        const groupDate = new Date(dayKey);
        const day = groupDate.getDate();
        const month = groupDate.toLocaleString(undefined, { month: 'long' });

        return (
          <div key={dayKey} className="calendar-day">
            <div className="calendar-day-label">
              <span>
                {day} {month}
              </span>
            </div>
            <div className="calendar-events">
              {events.map((event) => (
                <EventItem key={event.id} event={event} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Calendar;
