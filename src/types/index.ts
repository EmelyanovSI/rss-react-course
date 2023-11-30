import { Animal } from '@/interfaces/animal';
import { Params } from 'react-router-dom';

export type AppParams = Partial<Params<'page' | 'details'>>;

export interface CardLayoutContext {
  handleClose: () => void;
}

export interface ListPageContext {
  list: Animal[];
}
