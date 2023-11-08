import { Status } from '@/constants/enums';
import { Animal } from '@/interfaces/animal';

export type RouterParams = 'page' | 'limit' | 'details';
export type CardLayoutContext = {
  handleClose: () => void;
};
export type CardPageContext = {
  animal: Animal;
  status: Status;
  message: string;
};
