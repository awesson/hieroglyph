import { INumberMap, newMapWithEntry } from '../Misc/ObjectMaps';
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

function getType(state: StatementState)
{
	return state.type;
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
	functionsState = Functions.withNewBuiltInFuncDef(
		functionsState,
		"Print",
		Type.Void,
		[printArg],
		"print",
		null);
	const sqrtArg = Arguments.newArgumentDefState("value", Type.Float);
	functionsState = Functions.withNewBuiltInFuncDef(
		functionsState,
		"SquareRoot",
		Type.Float,
		[sqrtArg],
		"sqrt",
		"math");
	const absArg = Arguments.newArgumentDefState("value", Type.Float);
	functionsState = Functions.withNewBuiltInFuncDef(
		functionsState,
		"AbsoluteValue",
		Type.Float,
		[absArg],
		"abs",
		null);
	const baseArg = Arguments.newArgumentDefState("base", Type.Float);
	const exponentArg = Arguments.newArgumentDefState("exp", Type.Float);
	functionsState = Functions.withNewBuiltInFuncDef(
		functionsState,
		"RaiseToPower",
		Type.Float,
		[baseArg, exponentArg],
		"pow",
		"math");

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
	getType,
	StatementsState,
	initStatementsState,
	newStatementsState,
	withNewStatement,
	withNewFunctionsState,
	getStatement,
	getAllStatements,
	getFunctionsState
};
