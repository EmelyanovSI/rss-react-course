import { Dispatch, SetStateAction } from 'react';
import { Page } from '@/interfaces/animal';

export type RouterParams = 'page' | 'limit' | 'details';
export type ListContext = {
  setPagination: Dispatch<SetStateAction<Page>>;
};
export type CardContext = {
  handleClose: () => void;
};
