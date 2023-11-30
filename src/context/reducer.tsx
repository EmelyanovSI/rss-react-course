import { Status } from '@/constants';
import { ACTION_TYPE, AppContextAction, AppContextValue } from './actions';

export function reducer(state: AppContextValue, action: AppContextAction) {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }
    case ACTION_TYPE.GET_LIST_STARTED: {
      return {
        ...state,
        list: [],
        status: Status.Loading,
        message: '',
      };
    }
    case ACTION_TYPE.GET_LIST_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        status: Status.Succeeded,
        message: '',
      };
    }
    case ACTION_TYPE.GET_LIST_FAILURE: {
      return {
        ...state,
        list: [],
        status: Status.Failed,
        message: action.payload,
      };
    }
    case ACTION_TYPE.RESET_LIST: {
      return {
        ...state,
        list: [],
        status: Status.Idle,
        message: '',
      };
    }
    default: {
      throw Error('Unknown action');
    }
  }
}
