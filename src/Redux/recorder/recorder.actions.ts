import { Action } from 'redux';
import { START, STOP } from './recorder.types';

export type StartAction = Action<typeof START>;
export type StopAction = Action<typeof STOP>;

export const startAction = (): StartAction => ({
  type: START,
});

export const stopAction = (): StopAction => ({
  type: STOP,
});
