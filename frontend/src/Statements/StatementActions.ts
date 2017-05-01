import { StatementType } from './StatementTypes';

interface AddStatementAction
{
	type: "AddStatementAction";
	concreteStatementId: number;
	statementType: StatementType;
}

function createAddStatementAction(concreteStatementId: number,
                                  statementType: StatementType): AddStatementAction
{
	return { type: "AddStatementAction", concreteStatementId, statementType };
}

type AnyStatementAction = AddStatementAction;

export { AddStatementAction, createAddStatementAction, AnyStatementAction };
