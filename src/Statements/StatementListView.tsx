import { Dispatch } from 'redux';
import React, { Component } from 'react';

import { StatementState } from './StatementState';
import { IStatementElement } from './StatementListContainer';
import { FunctionStatement, FunctionCallState } from './Functions';
import RootState from '../RootState';


interface IStatementListViewProps
{
	listItems: IStatementElement[];
}

class StatementListView extends Component<IStatementListViewProps, {}>
{
	render()
	{
		const toStatementsList = (eleInfo: IStatementElement) =>
		{
			const Ele = eleInfo.comp;
			return <Ele key={eleInfo.viewProps.concreteStatementId} {...eleInfo.viewProps} />;
		}
		const listItems = this.props.listItems.map(toStatementsList);

		return <ul>{listItems}</ul>;
	}
}

export default StatementListView;
