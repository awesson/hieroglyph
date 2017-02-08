import { Dispatch } from 'redux';
import React from 'react';
import { connect } from "react-redux";

import { StatementState } from './StatementState';
import StatementListView from './StatementListView';
import { FunctionStatementContainer, FunctionCallState } from './Functions';
import RootState from '../RootState';


interface IStatementListContainerProps
{
	statements: number[];
}

export interface IStatementViewProps
{
	concreteStatementId: number;
}

export interface IStatementElement
{
	comp: React.ComponentClass<IStatementViewProps>;
	viewProps: IStatementViewProps;
}

const mapStateToProps = (rootState: RootState, myProps: IStatementListContainerProps) =>
{
	const statementToElement = (statementId: number) =>
	{
		console.log(rootState.getNumFuncCalls());
		const statement = RootState.getStatement(rootState, statementId);
		const jsxType = StatementState.getComponentContainer(statement);
		return {comp: jsxType, viewProps: {concreteStatementId: statement.concreteStatementId}};
	}
	const listItems:IStatementElement[] = myProps.statements.map(statementToElement);
	return { listItems };
}

export default connect(mapStateToProps, null)(StatementListView);
