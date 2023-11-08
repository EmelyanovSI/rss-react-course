import { Status } from '@/constants';
import { Animal } from '@/interfaces/animal';
import { getSearchFromStorage } from '@/utils';

export enum ACTION_TYPE {
  UPDATE_SEARCH = 'UPDATE_SEARCH',
  GET_LIST_STARTED = 'GET_LIST_STARTED',
  GET_LIST_SUCCESS = 'GET_LIST_SUCCESS',
  GET_LIST_FAILURE = 'GET_LIST_FAILURE',
  RESET_LIST = 'RESET_LIST',
}

export interface AppContextValue {
  search: string;
  list: Animal[];
  status: Status;
  message: string;
}

export const defaultValue: AppContextValue = {
  search: getSearchFromStorage(),
  list: [],
  status: Status.Idle,
  message: '',
};

interface UpdateSearchAction {
  type: ACTION_TYPE.UPDATE_SEARCH;
  payload: string;
}

interface GetListStartAction {
  type: ACTION_TYPE.GET_LIST_STARTED;
}

interface GetListSuccessAction {
  type: ACTION_TYPE.GET_LIST_SUCCESS;
  payload: Animal[];
}

interface GetListErrorAction {
  type: ACTION_TYPE.GET_LIST_FAILURE;
  payload: string;
}

interface ListResetAction {
  type: ACTION_TYPE.RESET_LIST;
}

export type AppContextAction =
  | UpdateSearchAction
  | GetListStartAction
  | GetListSuccessAction
  | GetListErrorAction
  | ListResetAction;
