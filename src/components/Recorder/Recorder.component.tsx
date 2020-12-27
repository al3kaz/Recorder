import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startAction, stopAction } from '../../Redux/recorder/recorder.actions';
import { selectDateStart } from '../../Redux/recorder/recorder.selectors';
import cx from 'classnames/bind';
import './Recorder.styles.css';

const addZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

export interface RecorderProps {}

const Recorder: React.FC<RecorderProps> = () => {
  const [count, setCount] = useState<number>(0);
  const dispatch = useDispatch();
  const dateStart = useSelector(selectDateStart);
  const started = dateStart !== '';
  let interval = useRef<number>(count);

  const handleClick = () => {
    if (started) {
      window.clearInterval(interval.current);
      dispatch(stopAction());
    } else {
      dispatch(startAction());
      interval.current = window.setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      window.clearInterval(interval.current);
    };
  }, []);

  let seconds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;

  const hours = seconds ? Math.floor(seconds / 60 / 60) : 0;
  seconds -= hours * 60 * 60;
  const minutes = seconds ? Math.floor(seconds / 60) : 0;
  seconds -= minutes * 60;

  return (
    <div className={cx('recorder', { 'recorder-started': started })}>
      <button onClick={handleClick} className="recorder-record">
        <span></span>
      </button>
      <div className="recorder-counter">
        {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
      </div>
    </div>
  );
};

export default Recorder;
