import {
  EVENT,
} from './types';
import { eventAPI } from '../api/Event';

export * from './Events/EventsActionsDelete';
export * from './Events/ActionsEventsFetch';
export * from './Events/ActionsEventsBuyTicket';

const EventCreateRequestFailure = (dispatch) => {
  dispatch({
    type: EVENT.CREATE.REQUEST_FAILURE,
  });
};

const EventCreateRequestSuccess = (dispatch, response) => {
  if (response.success) {
    dispatch({
      type: EVENT.CREATE.SUCCESS,
      payload: {
        message: response,
      },
    });
  } else {
    dispatch({
      type: EVENT.CREATE.FAILURE,
      payload: {
        message: response,
      },
    });
  }
};

export const EventActionCreateTry = (eventData) => {
  return (dispatch) => {
    dispatch({ type: EVENT.CREATE.TRY });
    eventAPI.add(
      eventData,
      (response) => { EventCreateRequestSuccess(dispatch, response); },
      () => { EventCreateRequestFailure(dispatch); },
    );
  };
};
