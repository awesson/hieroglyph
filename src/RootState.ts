import React from 'react';

import { StatementType } from './Statements/StatementTypes';
import { Type } from './Types';
import { Functions, StatementsState } from './Statements';
import FunctionsState = Functions.FunctionsState;

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
			this.functionsState = FunctionsState.withNewFuncDef(this.functionsState,
			                                                    "SquareRoot",
			                                                    Type.Float,
																[Type.Float]);
			this.functionsState = FunctionsState.withNewFuncDef(this.functionsState,
			                                                    "AbsoluteValue",
			                                                    Type.Float,
																[Type.Float]);
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

	// TODO: Do I need this? Can I use this?
	static getAsPlainObject(state: RootState)
	{
		return { ...state };
	}

	// TODO: Do these functions really need to be static? Even though I'm passing it as a plain object,
	// it seems like I can still call instance methods on the state returned by redux.
	getNumFuncCalls()
	{
		return this.functionsState.getNumFuncCalls();
	}
}

export default RootState;
