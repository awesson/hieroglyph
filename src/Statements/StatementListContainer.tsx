import { Dispatch } from 'redux';
import React from 'react';
import { connect } from "react-redux";

import { StatementState } from './StatementState';
import StatementListView from './StatementListView';
import { FunctionStatementContainer, FunctionCallState } from './Functions';
import RootState from '../RootState';


export type StatementSelectedCallback = (statementId: number, event: React.MouseEvent<any>) => void;

interface IStatementListContainerProps
{
	statements: number[];
	selectedStatementId: number;
	selectedCallback: StatementSelectedCallback;
}

export interface IStatementCompProps
{
	concreteStatementId: number;
	isSelected: boolean;
	selectedCallback: React.MouseEventHandler<any>;
}

export interface IStatementElement
{
	comp: React.ComponentClass<IStatementCompProps>;
	viewProps: IStatementCompProps;
}

const mapStateToProps = (rootState: RootState, myProps: IStatementListContainerProps) =>
{
	const statementToElement = (statementId: number) =>
	{
		const statement = RootState.getStatement(rootState, statementId);
		const comp = StatementState.getStatementContainerComponent(statement);

		const concreteStatementId = statement.concreteStatementId;
		const isSelected = (statementId == myProps.selectedStatementId);
		const selectedCallback = (event: React.MouseEvent<any>) =>
		{
			myProps.selectedCallback(statementId, event);
		}
		const viewProps = { concreteStatementId, isSelected, selectedCallback };
		
		return { comp, viewProps };
	}
	const listItems:IStatementElement[] = myProps.statements.map(statementToElement);
	return { listItems };
}

export default connect(mapStateToProps, null)(StatementListView);
