import { StatementType } from './StatementTypes';
import { combineReducers, Action } from 'redux';
import { StatementsState, StatementState } from './StatementState';
import { AnyStatementAction } from './StatementActions';

function statementReducer(state = new StatementsState(), action: AnyStatementAction)
{
	switch (action.type)
	{
		case "AddStatementAction":
			return StatementsState.withNewStatement(state,
			                                        action.concreteStatementId,
			                                        action.statementType);
		default:
			return state;
	}
}

export default statementReducer;
