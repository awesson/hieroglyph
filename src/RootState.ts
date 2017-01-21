import { Type } from './Types';
import { FunctionsState } from './Statements/Functions/FunctionState'
import { StatementsState } from './Statements';


class RootState
{
	statementsState: StatementsState;
	functionsState: FunctionsState;

	constructor(statementsState: StatementsState = new StatementsState(),
	            functionsState: FunctionsState = new FunctionsState())
	{
		this.statementsState = statementsState;
		this.functionsState = functionsState;

		if (functionsState.functions.size == 0)
		{
			// TODO: Eventually deserialize this data the same as how the user
			// created data will get deserialized.
			this.functionsState = FunctionsState.withNewFuncDef(this.functionsState,
			                                                    "Print",
			                                                    Type.Void,
			                                                    [Type.String]);
		}
	}

	static getStatement(state: RootState, id: number)
	{
		return StatementsState.getStatement(state.statementsState, id);
	}

	static getFuncDef(state: RootState, id: number)
	{
		return FunctionsState.getFuncDef(state.functionsState, id);
	}

	static getFuncCall(state: RootState, id: number)
	{
		return FunctionsState.getFuncCall(state.functionsState, id);
	}

	static getAsPlainObject(state: RootState)
	{
		return { ...state };
	}
}

export default RootState;
