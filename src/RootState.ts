import React from 'react';

import { StatementType } from './Statements/StatementTypes';
import { Type } from './Types';
import { StatementState } from './Statements';
import StatementsState = StatementState.StatementsState;
import newStatementsState = StatementState.newStatementsState;

export interface RootState
{
	statementsState: StatementsState;
}

export function initRootState()
{
	return { statementsState: StatementState.initStatementsState() };
}

export function newRootState(statementsState : StatementsState = newStatementsState()): RootState
{
	return { statementsState };
}

export function getStatementsState(state: RootState)
{
	return state.statementsState;
}

export function getFunctionsState(state: RootState)
{
	const statementsState = getStatementsState(state);
	return StatementState.getFunctionsState(statementsState);
}

export default RootState;
