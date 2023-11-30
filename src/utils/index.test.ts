import {
  getOriginalPath,
  getSearchFromStorage,
  setSearchFromStorage,
  triggerError,
} from './index';

describe('Utility Functions', () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  };

  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  afterEach(() => {
    console.error = originalConsoleError;
    vi.clearAllMocks();
  });

  it('getSearchFromStorage retrieves search value from localStorage', () => {
    const testSearchValue = 'test-search';
    localStorageMock.getItem.mockReturnValueOnce(testSearchValue);

    const result = getSearchFromStorage();

    expect(result).toBe(testSearchValue);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('search');
  });

  it('getSearchFromStorage returns an empty string when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValueOnce(null);

    const result = getSearchFromStorage();

    expect(result).toBe('');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('search');
  });

  it('setSearchFromStorage sets search value in localStorage', () => {
    const testSearchValue = 'test-search';
    setSearchFromStorage(testSearchValue);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'search',
      testSearchValue
    );
  });

  it('setSearchFromStorage removes search value from localStorage when not provided', () => {
    setSearchFromStorage();

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('search');
  });

  it('triggerError throws an error', () => {
    expect(triggerError).toThrow(Error);
    expect(triggerError).toThrow('This is a test error');
  });

  it('getOriginalPath generates the correct original path', () => {
    const testPage = '2';
    const testLimit = '25';
    const testDetails = 'example-details';

    const result = getOriginalPath(testLimit, testDetails, testPage);

    const expectedPath = `/page/${testPage}/limit/${testLimit}/${testDetails}`;
    expect(result).toBe(expectedPath);
  });
});
