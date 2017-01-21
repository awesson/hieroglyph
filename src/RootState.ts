import { Type } from './Types';
import { FunctionState } from './Statements/Functions/FunctionState'
import { StatementsState } from './Statements';


class RootState
{
	statementState: StatementsState;
	functionState: FunctionState;

	constructor(statementState: StatementsState = new StatementsState(),
	            functionState: FunctionState = new FunctionState())
	{
		this.statementState = statementState;
		this.functionState = functionState;

		if (functionState.functions.size == 0)
		{
			// TODO: Eventually deserialize this data the same as how the user
			// created data will get deserialized.
			this.functionState = FunctionState.withNewFuncDef(this.functionState,
			                                                  "Print",
			                                                  Type.Void,
			                                                  [Type.String]);
		}
	}

	static getStatement(state: RootState, id: number)
	{
		return StatementsState.getStatement(state.statementState, id);
	}

	static getFuncDef(state: RootState, id: number)
	{
		return FunctionState.getFuncDef(state.functionState, id);
	}

	static getFuncCall(state: RootState, id: number)
	{
		return FunctionState.getFuncCall(state.functionState, id);
	}

	static getAsPlainObject(state: RootState)
	{
		return { ...state };
	}
}

export default RootState;
