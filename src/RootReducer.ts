import { Action, combineReducers } from 'redux';

import RootState from './RootState';
import { Functions } from './Statements';
import * as Statements from './Statements';


const independentReducers = combineReducers<RootState>({
	statementsState: Statements.reducer,
	functionsState: Functions.reducer
});

type AllActions = Statements.AnyStatementAction | Functions.AnyFunctionAction;

function rootReducer(state = new RootState(), action: AllActions)
{
	switch (action.type)
	{
		case "AddFunctionCallAction":
			let newFunctionState = Functions.reducer(state.functionsState, action);

			let newFuncCall = Functions.FunctionsState.getLastCreatedFuncCall(newFunctionState);
			if (!newFuncCall)
			{
				return state;
			}

			const statementType = Statements.StatementType.FunctionCall;
			let derivedAction = Statements.createAddStatementAction(newFuncCall.myId,
			                                                        statementType);
			let newStatementState = Statements.reducer(state.statementsState, derivedAction);

			return new RootState(newStatementState, newFunctionState);

		default:
			return independentReducers(state, action);
	}
}

export default rootReducer;
