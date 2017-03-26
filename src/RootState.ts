import React from 'react';

import { StatementType } from './Statements/StatementTypes';
import { Type } from './Types';
import { Functions, StatementState } from './Statements';
import FunctionsState = Functions.FunctionState.FunctionsState;
import withNewFuncDef = Functions.FunctionState.withNewFuncDef;
import newFunctionsState = Functions.FunctionState.newFunctionsState;
import newArgumentDefState = Functions.Arguments.ArgumentState.newArgumentDefState;
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
	const printArg = newArgumentDefState("statement", Type.String);
	functionsState = withNewFuncDef(functionsState,
	                                "Print",
	                                Type.Void,
	                                [printArg]);
	const sqrtArg = newArgumentDefState("value", Type.Float);
	functionsState = withNewFuncDef(functionsState,
	                                "SquareRoot",
	                                Type.Float,
	                                [sqrtArg]);
	const absArg = newArgumentDefState("value", Type.Float);
	functionsState = withNewFuncDef(functionsState,
	                                "AbsoluteValue",
	                                Type.Float,
	                                [absArg]);
	const clampValueArg = newArgumentDefState("value", Type.Float);
	const clampMinArg = newArgumentDefState("min", Type.Float);
	const clampMaxArg = newArgumentDefState("max", Type.Float);
	functionsState = withNewFuncDef(functionsState,
	                                "Clamp",
	                                Type.Float,
	                                [clampValueArg, clampMinArg, clampMaxArg]);

	return { ...functionsState, ...newStatementsState() };
}

export function newRootState(functionsState : FunctionsState = newFunctionsState(),
                             statementsState : StatementsState = newStatementsState())
{
	return { ...functionsState, ...statementsState };
}

export default RootState;
