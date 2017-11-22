import functionReducer from './Functions/FunctionReducers';
import { combineReducers, Action } from 'redux';

import * as Functions from './Functions';
import * as State from './StatementState';
import { StatementType } from './StatementTypes';
import { AnyStatementAction } from './StatementActions';
import identityReducer from '../Misc/IdentityReducer';


function addFunctionCall(state: State.StatementsState, action: Functions.AddFunctionCallAction)
{
	let newFunctionState = Functions.reducer(State.getFunctionsState(state), action);

	let newFuncCall = Functions.getLastCreatedFuncCall(newFunctionState);
	if (!newFuncCall)
	{
		return state;
	}

	state = State.withNewFunctionsState(state, newFunctionState);
	return State.withNewStatement(state, newFuncCall.myId, StatementType.FunctionCall);
}

const reduceChildren = combineReducers<State.StatementsState>({
	statements: identityReducer({}),
	nextStatementId: identityReducer(0),
	functionsState: functionReducer,
});

function statementReducer(state : State.StatementsState = State.newStatementsState(), action: AnyStatementAction)
{
	switch (action.type)
	{
		case "AddFunctionCallAction":
			return addFunctionCall(state, action);
		default:
			return reduceChildren(state, action);
	}
}

export default statementReducer;
