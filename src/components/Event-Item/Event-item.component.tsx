import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserEvent } from '../../Redux/user/user.actions';
import { UserEvents } from '../../Redux/user/user.reducer';

interface EventItemProp {
  event: UserEvents;
}

const EventItem: React.FC<EventItemProp> = ({ event }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteUserEvent(event.id));
  };

  return (
    <div className="calendar-event">
      <div className="calendar-event-info">
        <div className="calendar-event-time">10:00 - 12:00</div>
        <div className="calendar-event-title">{event.title}</div>
      </div>
      <button onClick={handleDelete} className="calendar-event-delete-button">
        &times;
      </button>
    </div>
  );
};
export default EventItem;
