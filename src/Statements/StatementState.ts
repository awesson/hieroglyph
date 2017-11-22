import { INumberMap, newMapWithEntry } from '../ObjectMaps';
import { StatementType } from './StatementTypes';
import * as Functions from './Functions';
import Arguments = Functions.Arguments;
import { Type } from '../Types';


interface StatementState
{
	readonly myId: number;
	readonly concreteStatementId: number;
	readonly type: StatementType;
}

function newStatementState(myId: number = -1,
                           concreteStatementId: number = -1,
                           type: StatementType = StatementType.FunctionCall) : StatementState
{
	return { myId, concreteStatementId, type };
}

function getStatementContainerComponent(state: StatementState)
{
	switch(state.type)
	{
		default:
		case StatementType.FunctionCall:
			return Functions.FunctionStatementContainer;
	}
}

function getInspectorContainerComponent(state: StatementState)
{
	switch(state.type)
	{
		default:
		case StatementType.FunctionCall:
			return Functions.FunctionCallInspectorContainer;
	}
}


type StatementMap = INumberMap<StatementState>;

interface StatementsState
{
	readonly statements: StatementMap;
	readonly nextStatementId: number;
	readonly functionsState: Functions.FunctionsState;
}

function initStatementsState()
{
	let functionsState = Functions.newFunctionsState();

	// TODO: Eventually deserialize this data the same as how the user
	// created data will get deserialized.
	const printArg = Arguments.newArgumentDefState("statement", Type.String);
	functionsState = Functions.withNewFuncDef(
		functionsState,
		"Print",
		Type.Void,
		[printArg]);
	const sqrtArg = Arguments.newArgumentDefState("value", Type.Float);
	functionsState = Functions.withNewFuncDef(
		functionsState,
		"SquareRoot",
		Type.Float,
		[sqrtArg]);
	const absArg = Arguments.newArgumentDefState("value", Type.Float);
	functionsState = Functions.withNewFuncDef(
		functionsState,
		"AbsoluteValue",
		Type.Float,
		[absArg]);
	const clampValueArg = Arguments.newArgumentDefState("value", Type.Float);
	const clampMinArg = Arguments.newArgumentDefState("min", Type.Float);
	const clampMaxArg = Arguments.newArgumentDefState("max", Type.Float);
	functionsState = Functions.withNewFuncDef(
		functionsState,
		"Clamp",
		Type.Float,
		[clampValueArg, clampMinArg, clampMaxArg]);

	return newStatementsState({}, 0, functionsState);
}

function newStatementsState(
	statements: StatementMap = {},
	nextStatementId: number = 0,
	functionsState: Functions.FunctionsState = Functions.newFunctionsState()) : StatementsState
{
	return { statements, nextStatementId, functionsState };
}

function withNewStatement(state: StatementsState,
                          concreteStatementId: number,
                          statementType: StatementType) : StatementsState
{
	let newStatement = newStatementState(state.nextStatementId,
                                         concreteStatementId,
                                         statementType);
	const newStatements = newMapWithEntry(state.statements,
                                          state.nextStatementId,
                                          newStatement);
	return newStatementsState(newStatements, state.nextStatementId + 1, state.functionsState);
}

function withNewFunctionsState(state: StatementsState, functionsState: Functions.FunctionsState) : StatementsState
{
	return { ...state, functionsState };
}

function getAllStatements(state: StatementsState)
{
	return state.statements;
}

function getStatement(state: StatementsState, statementId: number)
{
	return state.statements[statementId];
}

function getFunctionsState(state: StatementsState)
{
	return state.functionsState;
}

export
{
	StatementState,
	newStatementState,
	getStatementContainerComponent,
	getInspectorContainerComponent,
	StatementsState,
	initStatementsState,
	newStatementsState,
	withNewStatement,
	withNewFunctionsState,
	getStatement,
	getAllStatements,
	getFunctionsState
};
