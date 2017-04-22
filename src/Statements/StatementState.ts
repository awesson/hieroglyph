import { INumberMap, newMapWithEntry } from '../ObjectMaps';
import { StatementType } from './StatementTypes';
import { FunctionStatementContainer, FunctionCallInspectorContainer } from './Functions';


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
			return FunctionStatementContainer;
	}
}

function getInspectorContainerComponent(state: StatementState)
{
	switch(state.type)
	{
		default:
		case StatementType.FunctionCall:
			return FunctionCallInspectorContainer;
	}
}


type StatementMap = INumberMap<StatementState>;

interface StatementsState
{
	readonly statements: StatementMap;
	readonly nextStatementId: number;
}

function newStatementsState(statements: StatementMap = {},
                            nextStatementId: number = 0) : StatementsState
{
	return { statements, nextStatementId };
}

// Can be used to copy StatementsState or to extract just the StatementsState fields from an object
function copyStatementsState(state: StatementsState)
{
	return newStatementsState(state.statements, state.nextStatementId);
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
	return newStatementsState(newStatements, state.nextStatementId + 1);
}

function getAllStatements(state: StatementsState)
{
	return state.statements;
}

function getStatement(state: StatementsState, statementId: number)
{
	return state.statements[statementId];
}


export
{
	StatementState,
	newStatementState,
	copyStatementsState,
	getStatementContainerComponent,
	getInspectorContainerComponent,
	StatementsState,
	newStatementsState,
	withNewStatement,
	getStatement,
	getAllStatements
};
