import { ArgumentDefState, getArgumentTypes, getArgumentNames } from './Arguments';
import { Type, mapToDefaultValues } from '../../Types';
import { INumberMap, newMapWithEntry } from '../../Misc/ObjectMaps';


interface FunctionDefState
{
	readonly myId: number;
	readonly name: string;
	readonly returnType: Type;
	readonly argumentDefs: ArgumentDefState[];
}

export interface UserFunctionDefState extends FunctionDefState
{
	readonly statements: number[];
	readonly isBuiltIn: false;
}

export interface BuiltInFunctionDefState extends FunctionDefState
{
	readonly builtInName: string;
	readonly source: string;
	readonly isBuiltIn: true;
}

export type AnyFunctionDefState = UserFunctionDefState | BuiltInFunctionDefState;

export function newUserFunctionDefState(myId: number,
                                        name: string,
                                        returnType: Type,
                                        argumentDefs: ArgumentDefState[],
                                        statements: number[]) : UserFunctionDefState
{
	if (!name || name.length == 0)
	{
		name = "unknown";
	}
	if (!argumentDefs)
	{
		argumentDefs = [];
	}
	if (!statements)
	{
		statements = [];
	}
	return { myId, name, returnType, argumentDefs, statements, isBuiltIn: false };
}

export function newBuiltInFunctionDefState(myId: number,
                                           name: string,
                                           returnType: Type,
                                           argumentDefs: ArgumentDefState[],
                                           builtInName: string,
                                           source: string) : BuiltInFunctionDefState
{
	if (!name || name.length == 0)
	{
		name = "unknown";
	}
	if (!argumentDefs)
	{
		argumentDefs = [];
	}
	return { myId, name, returnType, argumentDefs, builtInName, source, isBuiltIn: true };
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
	// This works for outputting to a source file just fine.
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


export type FunctionDefMap = INumberMap<AnyFunctionDefState>;

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

export function withNewBuiltInFuncDef(state: FunctionsState,
                                      name: string,
                                      returnType: Type,
                                      argumentDefs: ArgumentDefState[],
                                      builtInName: string,
                                      source: string)
{
	const newFuncDef = newBuiltInFunctionDefState(state.nextFunctionId,
	                                              name,
	                                              returnType,
	                                              argumentDefs,
	                                              builtInName,
	                                              source);
	return withNewFuncDef(state, newFuncDef);
}

export function withNewUserFuncDef(state: FunctionsState,
                                   name: string,
                                   returnType: Type,
                                   argumentDefs: ArgumentDefState[])
{
	// new funtion starts out with no statements
	const statements = [];
	const newFuncDef = newUserFunctionDefState(state.nextFunctionId, name, returnType, argumentDefs, statements);
	return withNewFuncDef(state, newFuncDef);
}

export function withNewFuncDef(state: FunctionsState, newFuncDef: AnyFunctionDefState)
{
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
