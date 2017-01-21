import { copyMapWithAddedEntry } from '../MapHelpers/MapHelpers';
import { StatementType } from './StatementTypes';


export class StatementState
{
	readonly myId: number;
	readonly concreteStatementId: number;
	readonly type: StatementType;

	constructor(myId: number, concreteStatementId: number, type: StatementType)
	{
		this.myId = myId;
		this.concreteStatementId = concreteStatementId;
		this.type = type;
	}
}

export class StatementsState
{
	readonly statements: Map<number, StatementState>;
	readonly nextStatementId: number;

	constructor(statements: Map<number, StatementState> = new Map<number, StatementState>(),
	            nextStatementId: number = 0)
	{
		this.statements = statements;
		this.nextStatementId = nextStatementId;
	}

	static withNewStatement(state: StatementsState,
	                        concreteStatementId: number,
	                        statementType: StatementType)
	{
		let newStatement = new StatementState(state.nextStatementId,
		                                      concreteStatementId,
		                                      statementType);
		const newStatements = copyMapWithAddedEntry(state.statements,
		                                            state.nextStatementId,
		                                            newStatement);
		return new StatementsState(newStatements, state.nextStatementId + 1);
	}

	static getStatement(state: StatementsState, statementId: number)
	{
		return state.statements.get(statementId);
	}
}
