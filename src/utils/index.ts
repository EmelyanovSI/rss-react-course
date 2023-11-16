import { AppParams } from '@/types';
import { generatePath } from 'react-router-dom';

export const triggerError = () => {
  throw new Error('This is a test error');
};

export function generateAppPath(params: AppParams = {}) {
  const { page = '1', details = '' } = params;
  const originalPath = '/page/:page/:details';
  return generatePath(originalPath, { page, details });
}
