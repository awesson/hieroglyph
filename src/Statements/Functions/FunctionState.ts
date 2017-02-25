import { Type, mapToDefaultValues } from '../../Types';
import { copyMapWithAddedEntry } from '../../MapHelpers';

class FunctionDefState
{
	readonly myId: number;
	readonly name: string;
	readonly returnType: Type;
	readonly argumentTypes: Type[];
	readonly statements: number[];
	readonly isBuiltin: boolean;

	constructor(myId: number,
	            name: string = "unnamed",
	            returnType: Type = Type.Void,
	            argumentTypes: Type[] = null,
	            isBuiltin: boolean = true)
	{
		this.myId = myId;
		this.name = name;
		this.returnType = returnType;
		this.argumentTypes = argumentTypes;
		this.isBuiltin = isBuiltin;
		this.statements = null;
	}

	static getDefaultArguments(state: FunctionDefState)
	{
		return mapToDefaultValues(state.argumentTypes);
	}
}

class FunctionCallState
{
	readonly myId: number;
	readonly funcDefId: number;
	// For now the user will be inputing argument types through a text field.
	// This works for outputting to a .cs file just fine.
	readonly passedArguments: string[];

	constructor(myId: number = -1, funcDefId: number = -1, passedArguments: string[] = null)
	{
		this.myId = myId;
		this.funcDefId = funcDefId;
		this.passedArguments = passedArguments;
	}

	static setArgument(state: FunctionCallState, index: number, value: string)
	{
		let newArguments = [...state.passedArguments.slice(0, index),
		                    value,
		                    ...state.passedArguments.slice(index + 1)];
		return new FunctionCallState(state.myId, state.funcDefId, newArguments);
	}
}

class FunctionsState
{
	functions: Map<number, FunctionDefState>;
	nextFunctionID: number;
	functionCalls: Map<number, FunctionCallState>;
	nextFunctionCallID: number;

	constructor(functions: Map<number, FunctionDefState> = new Map<number, FunctionDefState>(),
	            nextFunctionID: number = 0,
	            functionCalls: Map<number, FunctionCallState> = new Map<number, FunctionCallState>(),
	            nextFunctionCallID: number = 0)
	{
		this.functions = functions;
		this.nextFunctionID = nextFunctionID;
		this.functionCalls = functionCalls;
		this.nextFunctionCallID = nextFunctionCallID;
	}

	static withNewFunctionCall(state: FunctionsState, sourceFuncDefId: number): FunctionsState
	{
		const funcDef = FunctionsState.getFuncDef(state, sourceFuncDefId);
		const defaultArgs = FunctionDefState.getDefaultArguments(funcDef);
		const newFuncCall = new FunctionCallState(state.nextFunctionCallID,
		                                          sourceFuncDefId,
		                                          defaultArgs);
		const newFuncCallMap = copyMapWithAddedEntry(state.functionCalls,
		                                             state.nextFunctionCallID,
		                                             newFuncCall);
		return new FunctionsState(state.functions,
		                          state.nextFunctionID,
		                          newFuncCallMap,
		                          state.nextFunctionCallID + 1);
	}

	static withNewFuncDef(state: FunctionsState,
	                      name: string = "unnamed",
	                      returnType: Type = Type.Void,
	                      argumentTypes: Type[] = null,
	                      isBuiltin: boolean = true)
	{
		const newFuncDef = new FunctionDefState(state.nextFunctionID,
		                                        name,
		                                        returnType,
		                                        argumentTypes,
		                                        isBuiltin);
		const newFuncDefMap = copyMapWithAddedEntry(state.functions,
		                                            state.nextFunctionID,
		                                            newFuncDef);
		return new FunctionsState(newFuncDefMap,
		                          state.nextFunctionID + 1,
		                          state.functionCalls,
		                          state.nextFunctionCallID);
	}

	static getFuncDef(state: FunctionsState, id: number)
	{
		return state.functions.get(id);
	}

	static getFuncCall(state: FunctionsState, id: number)
	{
		return state.functionCalls.get(id);
	}

	static getLastCreatedFuncCall(state: FunctionsState)
	{
		let lastFuncCallId = state.nextFunctionCallID;
		let funcCall: FunctionCallState;

		while (!funcCall && lastFuncCallId > 0)
		{
			--lastFuncCallId;
			funcCall = FunctionsState.getFuncCall(state, lastFuncCallId);
		}

		return funcCall;
	}

	getNumFuncCalls()
	{
		return this.functionCalls.size;
	}
}

export { FunctionsState, FunctionDefState, FunctionCallState };
