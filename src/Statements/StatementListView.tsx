import { Dispatch } from 'redux';
import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

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
			return <ListGroupItem key={eleInfo.viewProps.concreteStatementId}>
				       <Ele  {...eleInfo.viewProps} />
				   </ListGroupItem>;
		}
		const listItems = this.props.listItems.map(toStatementsList);

		return <ListGroup style={{'listStyle': 'none'}}>{listItems}</ListGroup>;
	}
}

export default StatementListView;
