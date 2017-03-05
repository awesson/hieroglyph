import { copyMapWithAddedEntry } from '../MapHelpers/MapHelpers';
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


interface StatementsState
{
	readonly statements: Map<number, StatementState>;
	readonly nextStatementId: number;
}

function newStatementsState(statements: Map<number, StatementState> = new Map<number, StatementState>(),
                            nextStatementId: number = 0) : StatementsState
{
	return { statements, nextStatementId }
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
	const newStatements = copyMapWithAddedEntry(state.statements,
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
	return state.statements.get(statementId);
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
