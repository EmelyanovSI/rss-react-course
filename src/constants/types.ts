import { Dispatch, SetStateAction } from 'react';

export type RouterParams = 'page' | 'limit' | 'details';
export type ListContext = {
  setFirst: Dispatch<SetStateAction<boolean>>;
  setLast: Dispatch<SetStateAction<boolean>>;
};
export type CardContext = {
  handleClose: () => void;
};
