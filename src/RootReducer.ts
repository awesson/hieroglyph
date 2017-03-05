import { combineReducers } from 'redux';

import RootState, { newRootState } from './RootState';
import { AllActions } from './RootActions';
import { Functions } from './Statements';
import * as Statements from './Statements';
import getLastCreatedFuncCall = Functions.FunctionState.getLastCreatedFuncCall;


function independentReducers(state : RootState, action: AllActions)
{
	return newRootState(Functions.reducer(state, action), Statements.reducer(state, action));
}

function addFunctionCall(state : RootState, action: Functions.AddFunctionCallAction)
{
	let newFunctionState = Functions.reducer(state, action);

	let newFuncCall = getLastCreatedFuncCall(newFunctionState);
	if (!newFuncCall)
	{
		return state;
	}

	const statementType = Statements.StatementType.FunctionCall;
	let derivedAction = Statements.createAddStatementAction(newFuncCall.myId,
	                                                        statementType);
	let newStatementState = Statements.reducer(state, derivedAction);

	return newRootState(newFunctionState, newStatementState);
}

function rootReducer(state : RootState = newRootState(), action: AllActions)
{
	switch (action.type)
	{
		case "AddFunctionCallAction":
			return addFunctionCall(state, action);
		default:
			return independentReducers(state, action);
	}
}

export default rootReducer;
