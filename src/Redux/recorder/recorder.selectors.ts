import { RootState } from '../root-reducer';

export const selectDateStart = (rootState: RootState) =>
  rootState.recorder.dateStart;
