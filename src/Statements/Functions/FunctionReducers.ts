import { combineReducers } from 'redux';

import RootState from '../../RootState';
import { FunctionsState, FunctionCallState, FunctionDefState } from './FunctionState';
import { AnyFunctionAction, AnyFunctionCallAction, AnyFunctionDefAction } from './FunctionActions';
import { copyMapWithUpdatedValue } from '../../MapHelpers';


const identityReducer = (defaultValue: any) =>
{
	return (state = defaultValue, action: any) =>
	{
		return state;
	}
}

const reduceChildren = combineReducers<FunctionsState>({
	functions: functionDefReducer,
	nextFunctionID: identityReducer(0),
	functionCalls: functionCallReducer,
	nextFunctionCallID: identityReducer(0)
});

function functionReducer(state = new FunctionsState(), action: AnyFunctionAction)
{
	switch (action.type)
	{
		case "AddFunctionCallAction":
			return FunctionsState.withNewFunctionCall(state, action.funcDefId);
		default:
			//const _exhaustiveCheck: never = action;
			// TODO: Do I need to add identity functions for the indices members?
			return reduceChildren(state, action);
	}
}

function functionCallReducer(state = new Map<number, FunctionCallState>(), action: AnyFunctionCallAction)
{
	const funcCallState = state.get(action.funcCallId);

	switch (action.type)
	{
		case "SetFunctionCallArgumentAction":
			const newFuncCallState = FunctionCallState.setArgument(funcCallState,
			                                                       action.argIndex,
			                                                       action.argValue);
			return copyMapWithUpdatedValue(state, action.funcCallId, newFuncCallState);
		default:
			//const _exhaustiveCheck: never = action;
			return state;
	}
}

function functionDefReducer(state = new Map<number, FunctionDefState>(), action: AnyFunctionDefAction)
{
	switch (action.type)
	{
		default:
			//const _exhaustiveCheck: never = action;
			return state;
	}
}

export default functionReducer;
