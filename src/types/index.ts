import { Animal } from '@/interfaces/animal';
import { Loading } from '@/interfaces/loading';

export type RouterParams = 'page' | 'limit' | 'details';

export interface CardLayoutContext {
  handleClose: () => void;
}

export interface CardPageContext extends Loading {
  animal: Animal;
}
