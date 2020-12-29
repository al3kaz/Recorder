import {
  CreateSuccessAction,
  DeleteSuccessAction,
  LoadSuccessAction,
} from './user.actions';
import { CREATE_SUCCESS, DELETE_SUCCESS, LOAD_SUCCESS } from './user.types';

export interface UserEvents {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
}

interface UserEventsState {
  byIds: Record<UserEvents['id'], UserEvents>;
  allIds: UserEvents['id'][];
}

const INITIAL_STATE: UserEventsState = {
  byIds: {},
  allIds: [],
};

const userEventsReducer = (
  state: UserEventsState = INITIAL_STATE,
  action: LoadSuccessAction | CreateSuccessAction | DeleteSuccessAction
) => {
  switch (action.type) {
    case LOAD_SUCCESS:
      const { events } = action.payload;
      return {
        ...state,
        allIds: events.map(({ id }) => id),
        byIds: events.reduce<UserEventsState['byIds']>((byIds, event) => {
          byIds[event.id] = event;
          return byIds;
        }, {}),
      };

    case CREATE_SUCCESS:
      const { event } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, event.id],
        byIds: { ...state.byIds, [event.id]: event },
      };

    case DELETE_SUCCESS:
      const { id } = action.payload;
      const newState = {
        ...state,
        byIds: { ...state.byIds },
        allIds: state.allIds.filter((storedId) => storedId !== id),
      };
      delete newState.byIds[id];
      return newState;

    default:
      return state;
  }
};

export default userEventsReducer;
