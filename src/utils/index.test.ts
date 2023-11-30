import { generateAppPath, triggerError } from './index';

describe('Utils', () => {
  describe('triggerError', () => {
    it('throws an error', () => {
      expect(triggerError).toThrow(Error);
      expect(triggerError).toThrow('This is a test error');
    });
  });

  describe('generateAppPath', () => {
    it('should generate the correct app path with default parameters', () => {
      const result = generateAppPath();
      expect(result).toEqual('/page/1');
    });

    it('should generate the correct app path with custom parameters', () => {
      const result = generateAppPath({ page: '2', details: 'customDetails' });
      expect(result).toEqual('/page/2/customDetails');
    });
  });
});
