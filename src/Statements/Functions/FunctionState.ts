import { ArgumentState } from './Arguments';
import ArgumentDefState = ArgumentState.ArgumentDefState;
import getArgumentTypes = ArgumentState.getArgumentTypes;
import getArgumentNames = ArgumentState.getArgumentNames;
import { Type, mapToDefaultValues } from '../../Types';
import { INumberMap, newMapWithEntry } from '../../ObjectMaps';


export interface FunctionDefState
{
	readonly myId: number;
	readonly name: string;
	readonly returnType: Type;
	readonly argumentDefs: ArgumentDefState[];
	readonly statements: number[];
	readonly isBuiltin: boolean;
}

export function newFunctionDefState(myId: number,
                                    name: string = "unnamed",
                                    returnType: Type = Type.Void,
                                    argumentDefs: ArgumentDefState[] = [],
                                    isBuiltin: boolean = true,
                                    statements: number[] = []) : FunctionDefState
{
	return { myId, name, returnType, argumentDefs, statements, isBuiltin };
}

export function getFuncArgTypes(state: FunctionDefState)
{
	return getArgumentTypes(state.argumentDefs);
}

export function getDefaultArguments(state: FunctionDefState)
{
	return mapToDefaultValues(getFuncArgTypes(state));
}

export function getFuncArgNames(state: FunctionDefState)
{
	return getArgumentNames(state.argumentDefs);
}


export interface FunctionCallState
{
	readonly myId: number;
	readonly funcDefId: number;
	// For now the user will be inputing argument types through a text field.
	// This works for outputting to a .cs file just fine.
	readonly passedArguments: string[];
}

export function newFunctionCallState(myId: number = -1,
                                     funcDefId: number = -1,
                                     passedArguments: string[] = null) : FunctionCallState
{
	return { myId, funcDefId, passedArguments };
}

export function setArgument(state: FunctionCallState, index: number, value: string)
{
	let newArguments = [...state.passedArguments.slice(0, index),
	                    value,
	                    ...state.passedArguments.slice(index + 1)];
	return newFunctionCallState(state.myId, state.funcDefId, newArguments);
}


export type FunctionDefMap = INumberMap<FunctionDefState>;

export type FunctionCallMap = INumberMap<FunctionCallState>;

export interface FunctionsState
{
	readonly functions: FunctionDefMap;
	readonly nextFunctionId: number;
	readonly functionCalls: FunctionCallMap;
	readonly nextFunctionCallId: number;
}

export function newFunctionsState(functions: FunctionDefMap = {},
                                  nextFunctionId: number = 0,
                                  functionCalls: FunctionCallMap = {},
                                  nextFunctionCallId: number = 0) : FunctionsState
{
	return { functions, nextFunctionId, functionCalls, nextFunctionCallId };
}

export function getFunctionsState(state: FunctionsState)
{
	return newFunctionsState(state.functions, state.nextFunctionId, state.functionCalls, state.nextFunctionCallId);
}

export function withNewFunctionCall(state: FunctionsState, sourceFuncDefId: number): FunctionsState
{
	const funcDef = getFuncDef(state, sourceFuncDefId);
	const defaultArgs = getDefaultArguments(funcDef);
	const newFuncCall = newFunctionCallState(state.nextFunctionCallId,
	                                         sourceFuncDefId,
	                                         defaultArgs);
	const newFuncCallMap = newMapWithEntry(state.functionCalls, state.nextFunctionCallId, newFuncCall);
	return newFunctionsState(state.functions,
	                         state.nextFunctionId,
	                         newFuncCallMap,
	                         state.nextFunctionCallId + 1);
}

export function withNewFuncDef(state: FunctionsState,
                               name: string = "unnamed",
                               returnType: Type = Type.Void,
                               argumentDefs: ArgumentDefState[] = [],
                               isBuiltin: boolean = true)
{
	const newFuncDef = newFunctionDefState(state.nextFunctionId,
	                                       name,
	                                       returnType,
	                                       argumentDefs,
	                                       isBuiltin);
	const newFuncDefMap = newMapWithEntry(state.functions, state.nextFunctionId, newFuncDef);
	return newFunctionsState(newFuncDefMap,
	                         state.nextFunctionId + 1,
	                         state.functionCalls,
	                         state.nextFunctionCallId);
}

export function getFuncDef(state: FunctionsState, id: number)
{
	return state.functions[id];
}

export function getFuncCallDef(state: FunctionsState, funcCallState: FunctionCallState)
{
	return getFuncDef(state, funcCallState.funcDefId);
}

export function getAllFuncDefs(state: FunctionsState)
{
	return state.functions;
}

export function getFuncCall(state: FunctionsState, id: number)
{
	return state.functionCalls[id];
}

export function getAllFuncCalls(state: FunctionsState)
{
	return state.functionCalls;
}

export function getLastCreatedFuncCall(state: FunctionsState)
{
	let lastFuncCallId = state.nextFunctionCallId;
	let funcCall: FunctionCallState;

	while (!funcCall && lastFuncCallId > 0)
	{
		--lastFuncCallId;
		funcCall = getFuncCall(state, lastFuncCallId);
	}

	return funcCall;
}

export function getNumFuncCalls()
{
	return this.functionCalls.size;
}
