import { combineReducers } from 'redux';

import RootState from './RootState';
import * as Statements from './Statements';


export default combineReducers<RootState>({
	statementsState: Statements.reducer
});
