import { ACTION_TYPE, AppContextAction, AppContextValue } from './actions';

export function reducer(value: AppContextValue, action: AppContextAction) {
  switch (action.type) {
    case ACTION_TYPE.SEARCH: {
      return {
        ...value,
        search: action.payload,
      };
    }
    case ACTION_TYPE.LIST: {
      return {
        ...value,
        list: action.payload,
      };
    }
    default: {
      throw Error('Unknown action');
    }
  }
}
