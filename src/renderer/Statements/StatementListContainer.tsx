import React from 'react';
import { connect } from "react-redux";

import { getStatementContainerComponent, getStatement } from './StatementState';
import StatementListView, { IStatementListViewConnectedProps } from './StatementListView';
import RootState, { getStatementsState } from '../RootState';



export interface IStatementCompProps
{
	concreteStatementId: number;
	isSelected: boolean;
}

export interface IStatementElement
{
	comp: React.ComponentClass<IStatementCompProps>;
	selectedCallback: React.MouseEventHandler<any>;
	viewProps: IStatementCompProps;
}

const mapStateToProps = (rootState: RootState, myProps: IStatementListViewConnectedProps) =>
{
	const statementsState = getStatementsState(rootState);
	const statementToElement = (statementId: number) : IStatementElement =>
	{
		const statement = getStatement(statementsState, statementId);
		const comp = getStatementContainerComponent(statement);

		const concreteStatementId = statement.concreteStatementId;
		const isSelected = (statementId == myProps.selectedStatementId);
		const selectedCallback = (event: React.MouseEvent<any>) =>
		{
			myProps.selectedCallback(statementId, event);
		}
		const viewProps = { concreteStatementId, isSelected };
		
		return { comp, selectedCallback, viewProps };
	}
	const listItems:IStatementElement[] = myProps.statements.map(statementToElement);
	return { listItems };
}

export default connect(mapStateToProps, null)(StatementListView);
