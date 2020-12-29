import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../root-reducer';
import {
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} from './user.types';
import { UserEvents } from './user.reducer';
import { selectDateStart } from '../recorder/recorder.selectors';

export interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {}
export interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
  payload: {
    events: UserEvents[];
  };
}
export interface LoadFailureAction extends Action<typeof LOAD_FAILURE> {
  error: string;
}

export const loadUserEvents = (): ThunkAction<
  void,
  RootState,
  undefined,
  LoadRequestAction | LoadSuccessAction | LoadFailureAction
> => async (dispatch, getState) => {
  dispatch({
    type: LOAD_REQUEST,
  });

  try {
    const response = await fetch('http://localhost:3001/events');
    const events: UserEvents[] = await response.json();
    dispatch({
      type: LOAD_SUCCESS,
      payload: { events },
    });
  } catch (error) {
    dispatch({
      type: LOAD_FAILURE,
      error: 'Failed to load events',
    });
  }
};

export interface CreateRequestAction extends Action<typeof CREATE_REQUEST> {}
export interface CreateSuccessAction extends Action<typeof CREATE_SUCCESS> {
  payload: {
    event: UserEvents;
  };
}
export interface CreateFailureAction extends Action<typeof CREATE_FAILURE> {
  error: string;
}

export const createUserEvent = (): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  CreateRequestAction | CreateSuccessAction | CreateFailureAction
> => async (dispatch, getState) => {
  dispatch({
    type: CREATE_REQUEST,
  });

  try {
    const dateStart = selectDateStart(getState());
    const event: Omit<UserEvents, 'id'> = {
      title: 'no name',
      dateStart,
      dateEnd: new Date().toISOString(),
    };

    const response = await fetch('http://localhost:3001/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });

    const createdEvent: UserEvents = await response.json();

    dispatch({
      type: CREATE_SUCCESS,
      payload: { event: createdEvent },
    });
  } catch (error) {
    dispatch({
      type: CREATE_FAILURE,
      error: 'asdasdsad',
    });
  }
};

export interface DeleteRequestAction extends Action<typeof DELETE_REQUEST> {}
export interface DeleteSuccessAction extends Action<typeof DELETE_SUCCESS> {
  payload: {
    id: UserEvents['id'];
  };
}
export interface DeleteFailureAction extends Action<typeof DELETE_FAILURE> {}

export const deleteUserEvent = (
  id: UserEvents['id']
): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  DeleteRequestAction | DeleteSuccessAction | DeleteFailureAction
> => async (dispatch) => {
  dispatch({
    type: DELETE_REQUEST,
  });

  try {
    const response = await fetch(`http://localhost:3001/events/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({
        type: DELETE_SUCCESS,
        payload: { id },
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_FAILURE,
    });
  }
};
