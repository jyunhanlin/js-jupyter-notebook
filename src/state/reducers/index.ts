import { combineReducers } from 'redux';

import bundlesReducer from './bundlesReducer';
import cellsReducer from './cellsReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
