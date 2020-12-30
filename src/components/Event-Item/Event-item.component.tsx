import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteUserEvent,
  updateEventAction,
} from '../../Redux/user/user.actions';
import { UserEvents } from '../../Redux/user/user.reducer';

interface EventItemProp {
  event: UserEvents;
}

const EventItem: React.FC<EventItemProp> = ({ event }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteUserEvent(event.id));
  };

  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(event.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  const handleTitleClick = () => {
    setEditable(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    if (title !== event.title) {
      dispatch(
        updateEventAction({
          ...event,
          title,
        })
      );
    }
    setEditable(false);
  };

  return (
    <div className="calendar-event">
      <div className="calendar-event-info">
        <div className="calendar-event-time">10:00 - 12:00</div>
        <div className="calendar-event-title">
          {editable ? (
            <input
              type="text"
              value={title}
              ref={inputRef}
              onChange={handleTitleChange}
              onBlur={handleBlur}
            />
          ) : (
            <span onClick={handleTitleClick}>{event.title}</span>
          )}
        </div>
      </div>
      <button onClick={handleDelete} className="calendar-event-delete-button">
        &times;
      </button>
    </div>
  );
};
export default EventItem;
