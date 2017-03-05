import React from 'react';

import { StatementType } from './Statements/StatementTypes';
import { Type } from './Types';
import { Functions, StatementState } from './Statements';
import FunctionsState = Functions.FunctionState.FunctionsState;
import withNewFuncDef = Functions.FunctionState.withNewFuncDef;
import newFunctionsState = Functions.FunctionState.newFunctionsState;
import StatementsState = StatementState.StatementsState;
import newStatementsState = StatementState.newStatementsState;

interface RootState extends StatementsState, FunctionsState
{
}

export function initRootState()
{
	let functionsState = newFunctionsState();

	// TODO: Eventually deserialize this data the same as how the user
	// created data will get deserialized.
	functionsState = withNewFuncDef(functionsState,
	                                "Print",
	                                Type.Void,
	                                [Type.String]);
	functionsState = withNewFuncDef(functionsState,
	                                "SquareRoot",
	                                Type.Float,
	                                [Type.Float]);
	functionsState = withNewFuncDef(functionsState,
	                                "AbsoluteValue",
	                                Type.Float,
	                                [Type.Float]);
	functionsState = withNewFuncDef(functionsState,
	                                "Clamp",
	                                Type.Float,
	                                [Type.Float, Type.Float, Type.Float]);

	return { ...functionsState, ...newStatementsState() };
}

export function newRootState(functionsState : FunctionsState = newFunctionsState(),
                             statementsState : StatementsState = newStatementsState())
{
	return { ...functionsState, ...statementsState };
}

export default RootState;
