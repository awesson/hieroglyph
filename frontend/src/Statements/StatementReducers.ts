import { combineReducers, Action } from 'redux';

import { AllActions } from '../RootActions';
import { StatementsState, withNewStatement, newStatementsState, copyStatementsState } from './StatementState';
import { StatementType } from './StatementTypes';


function statementReducer(state : StatementsState = newStatementsState(), action: AllActions)
{
	switch (action.type)
	{
		case "AddStatementAction":
			return withNewStatement(state,
			                        action.concreteStatementId,
			                        action.statementType);
		default:
			// Need to make a new copy since the state passed in may be more than just a StatementsState.
			return copyStatementsState(state);
	}
}

export default statementReducer;
