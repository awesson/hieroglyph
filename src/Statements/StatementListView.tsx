import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { IStatementElement } from './StatementListContainer';

import '../index.css';


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
			// TODO: I'm not a huge fan of doing the selection styling here.
			// It should really be up to the statement's view to decide that,
			// but this is the only way I know that I can make the whole background be colored.
			// (It seems worse to make the assumtion in the statment view that it's
			// a) in a list and b) that the list is a ListGroup.)
			const cssClass = eleInfo.viewProps.isSelected
			               ? "hieroglyph-list-item-selected"
			               : "hieroglyph-list-item";
			return <ListGroupItem className={cssClass}
			                      key={eleInfo.viewProps.concreteStatementId}
			                      onClick={eleInfo.selectedCallback}>
				       <Ele  {...eleInfo.viewProps} />
				   </ListGroupItem>;
		}
		const listItems = this.props.listItems.map(toStatementsList);

		return <ListGroup>{listItems}</ListGroup>;
	}
}

export default StatementListView;
