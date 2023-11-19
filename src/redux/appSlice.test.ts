import { ViewMode } from '@/constants';
import appReducer, {
  clearSearch,
  initialState,
  setLimit,
  setSearch,
  toggleMode,
} from './appSlice';

describe('app reducer', () => {
  it('should handle setSearch', () => {
    const newState = appReducer(initialState, setSearch('new search'));
    expect(newState.search).toEqual('new search');
  });

  it('should handle clearSearch', () => {
    const newState = appReducer(initialState, clearSearch());
    expect(newState.search).toEqual('');
  });

  it('should handle setLimit', () => {
    const newState = appReducer(initialState, setLimit('20'));
    expect(newState.limit).toEqual('20');
  });

  it('should handle toggleMode', () => {
    const detailedState = { ...initialState, mode: ViewMode.Detailed };
    const compactState = { ...initialState, mode: ViewMode.Compact };

    const newState1 = appReducer(detailedState, toggleMode());
    const newState2 = appReducer(compactState, toggleMode());

    expect(newState1.mode).toEqual(ViewMode.Compact);
    expect(newState2.mode).toEqual(ViewMode.Detailed);
  });
});
