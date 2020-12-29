import { combineReducers } from 'redux';
import recorderReducer from './recorder/recorder.reducer';
import userEventsReducer from './user/user.reducer';

const rootReducer = combineReducers({
  userEvents: userEventsReducer,
  recorder: recorderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
