import { combineReducers } from 'redux';

import
{
	newFunctionsState,
	withNewFunctionCall,
	setArgument,
	FunctionCallMap,
	FunctionDefMap,
	FunctionsState
} from './FunctionState';
import { AnyFunctionAction, AnyFunctionCallAction, AnyFunctionDefAction } from './FunctionActions';
import { newMapWithEntry } from '../../Misc/ObjectMaps';
import identityReducer from '../../Misc/IdentityReducer';


const reduceChildren = combineReducers<FunctionsState>({
	functions: functionDefReducer,
	nextFunctionId: identityReducer(0),
	functionCalls: functionCallReducer,
	nextFunctionCallId: identityReducer(0)
});

function functionReducer(state : FunctionsState = newFunctionsState(), action: AnyFunctionAction)
{
	switch (action.type)
	{
		case "AddFunctionCallAction":
			return withNewFunctionCall(state, action.funcDefId);
		default:
			return reduceChildren(state, action);
	}
}

function functionCallReducer(state : FunctionCallMap = {}, action: AnyFunctionCallAction)
{
	switch (action.type)
	{
		case "SetFunctionCallArgumentAction":
		{
			const funcCallState = state[action.funcCallId];
			const newFuncCallState = setArgument(funcCallState,
			                                     action.argIndex,
			                                     action.argValue);
			return newMapWithEntry(state, action.funcCallId, newFuncCallState);
		}
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
