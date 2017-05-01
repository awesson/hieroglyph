import { combineReducers } from 'redux';

import RootState from '../../RootState';
import { AllActions } from '../../RootActions';
import
{
	newFunctionsState,
	withNewFunctionCall,
	FunctionCallState,
	setArgument,
	FunctionDefState,
	FunctionCallMap,
	FunctionDefMap,
	FunctionsState,
	getFunctionsState
} from './FunctionState';
import { AnyFunctionAction, AnyFunctionCallAction, AnyFunctionDefAction } from './FunctionActions';
import { newMapWithEntry } from '../../ObjectMaps';


function identityReducer<T>(defaultValue: T)
{
	return (state: T = defaultValue, action: AllActions) =>
	{
		return state;
	}
}

const reduceChildren = combineReducers<FunctionsState>({
	functions: functionDefReducer,
	nextFunctionId: identityReducer(0),
	functionCalls: functionCallReducer,
	nextFunctionCallId: identityReducer(0)
});

function functionReducer(state : FunctionsState = newFunctionsState(), action: AllActions)
{
	switch (action.type)
	{
		case "AddFunctionCallAction":
			return withNewFunctionCall(state, action.funcDefId);
		default:
			// TODO: Do I need to add identity functions for the indices members?
			return reduceChildren(getFunctionsState(state), action);
	}
}

function functionCallReducer(state : FunctionCallMap = {}, action: AnyFunctionCallAction)
{
	const funcCallState = state[action.funcCallId];

	switch (action.type)
	{
		case "SetFunctionCallArgumentAction":
			const newFuncCallState = setArgument(funcCallState,
			                                     action.argIndex,
			                                     action.argValue);
			return newMapWithEntry(state, action.funcCallId, newFuncCallState);
		default:
			return state;
	}
}

function functionDefReducer(state : FunctionDefMap = {}, action: AnyFunctionDefAction)
{
	switch (action.type)
	{
		default:
			return state;
	}
}

export default functionReducer;
