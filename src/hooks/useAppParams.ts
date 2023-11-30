import { AppParams } from '@/types';
import { useParams } from 'react-router-dom';

export const useAppParams = useParams<AppParams>;
