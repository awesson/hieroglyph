import { Type, mapToDefaultValues } from '../../Types';
import { copyMapWithAddedEntry } from '../../MapHelpers';


export interface FunctionDefState
{
	readonly myId: number;
	readonly name: string;
	readonly returnType: Type;
	readonly argumentTypes: Type[];
	readonly statements: number[];
	readonly isBuiltin: boolean;
}

export function newFunctionDefState(myId: number,
                                    name: string = "unnamed",
                                    returnType: Type = Type.Void,
                                    argumentTypes: Type[] = null,
                                    isBuiltin: boolean = true,
                                    statements: number[] = null) : FunctionDefState
{
	return { myId, name, returnType, argumentTypes, statements, isBuiltin };
}

export function getDefaultArguments(state: FunctionDefState)
{
	return mapToDefaultValues(state.argumentTypes);
}


export interface FunctionCallState
{
	readonly myId: number;
	readonly funcDefId: number;
	// For now the user will be inputing argument types through a text field.
	// This works for outputting to a .cs file just fine.
	readonly passedArguments: string[];
}

export function newFunctionCallState(myId: number = -1, funcDefId: number = -1, passedArguments: string[] = null)
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


export interface FunctionsState
{
	readonly functions: Map<number, FunctionDefState>;
	readonly nextFunctionId: number;
	readonly functionCalls: Map<number, FunctionCallState>;
	readonly nextFunctionCallId: number;
}

export function newFunctionsState(functions: Map<number, FunctionDefState> = new Map<number, FunctionDefState>(),
                                  nextFunctionId: number = 0,
                                  functionCalls: Map<number, FunctionCallState> = new Map<number, FunctionCallState>(),
                                  nextFunctionCallId: number = 0)
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
	const newFuncCallMap = copyMapWithAddedEntry(state.functionCalls,
	                                             state.nextFunctionCallId,
	                                             newFuncCall);
	return newFunctionsState(state.functions,
	                         state.nextFunctionId,
	                         newFuncCallMap,
	                         state.nextFunctionCallId + 1);
}

export function withNewFuncDef(state: FunctionsState,
                               name: string = "unnamed",
                               returnType: Type = Type.Void,
                               argumentTypes: Type[] = null,
                               isBuiltin: boolean = true)
{
	const newFuncDef = newFunctionDefState(state.nextFunctionId,
	                                       name,
	                                       returnType,
	                                       argumentTypes,
	                                       isBuiltin);
	const newFuncDefMap = copyMapWithAddedEntry(state.functions,
	                                            state.nextFunctionId,
	                                            newFuncDef);
	return newFunctionsState(newFuncDefMap,
	                         state.nextFunctionId + 1,
	                         state.functionCalls,
	                         state.nextFunctionCallId);
}

export function getFuncDef(state: FunctionsState, id: number)
{
	return state.functions.get(id);
}

export function getAllFuncDefs(state: FunctionsState)
{
	return state.functions;
}

export function getFuncCall(state: FunctionsState, id: number)
{
	return state.functionCalls.get(id);
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
