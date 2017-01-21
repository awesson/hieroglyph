import { Dispatch } from 'redux';
import React, { Component } from 'react';

import { StatementState } from './StatementState';
import { FunctionStatement, FunctionCallState } from './Functions';
import RootState from '../RootState';


interface IStatementListProps
{
	// TODO: Right now this is really a function call list.
	// Need to figure out how to generalize what this is rendering.
	rootState: RootState;
	statements: number[];
}

class StatementList extends Component<IStatementListProps, {}>
{
	render()
	{
		const rootState = this.props.rootState;
		const statementToListItem = (statementId: number) =>
		{
			const statement = RootState.getStatement(rootState, statementId);
			// TODO: Big assumtion made here that all statements are function calls.
			// Should be checking the type to see where to get the concrete statement info from.
			const functionCall = RootState.getFuncCall(rootState, statement.concreteStatementId);
			const func = RootState.getFuncDef(rootState, functionCall.funcDefId);
			return <FunctionStatement key={statement.concreteStatementId}
			                          name={func.name} />;
		}
		const listItems = this.props.statements.map(statementToListItem);

		return <ul>{listItems}</ul>;
	}
}

export default StatementList;
