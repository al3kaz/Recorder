import { RootState } from '../root-reducer';

export const selectUserEventsArray = (rootState: RootState) => {
  const state = rootState.userEvents;
  return state.allIds.map((id) => state.byIds[id]);
};
