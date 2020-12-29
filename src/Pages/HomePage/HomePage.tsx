import React from 'react';
import Calendar from '../../components/Calendar/Calendar.components';
import Recorder from '../../components/Recorder/Recorder.component';

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <Recorder />
      <Calendar />
    </div>
  );
};

export default HomePage;
