import { StartAction, StopAction } from './recorder.actions';
import { START, STOP } from './recorder.types';

interface RecorderState {
  dateStart: string;
}

const INITIAL_STATE: RecorderState = {
  dateStart: '',
};

const recorderReducer = (
  state: RecorderState = INITIAL_STATE,
  action: StartAction | StopAction
) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        dateStart: new Date().toISOString(),
      };
    case STOP:
      return {
        ...state,
        dateStart: '',
      };
    default:
      return state;
  }
};

export default recorderReducer;
