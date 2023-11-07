import { Animal } from '@/interfaces/animal';
import { getSearchFromStorage } from '@/utils';

export enum ACTION_TYPE {
  SEARCH = 'SEARCH',
  LIST = 'LIST',
}

export interface AppContextValue {
  search: string;
  list: Animal[];
}

export const defaultValue: AppContextValue = {
  search: getSearchFromStorage(),
  list: [],
};

interface SearchAction {
  type: ACTION_TYPE.SEARCH;
  payload: string;
}

interface ListAction {
  type: ACTION_TYPE.LIST;
  payload: Animal[];
}

export type AppContextAction = SearchAction | ListAction;
