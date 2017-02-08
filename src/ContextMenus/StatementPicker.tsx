import * as React from "react";
import { Dispatch } from "redux"

import RootState from '../RootState';
import { createAddFunctionCallAction } from '../Statements/Functions'
import DropDownSelector, { IItemInfo } from './DropDownSelector'


interface IStatementPickerProps
{
	rootState: RootState;
	dispatch: Dispatch<RootState>;
}

class StatementPicker extends React.Component<IStatementPickerProps, {}>
{
	constructor(props: IStatementPickerProps)
	{
		super(props);
		this.createSelectionHandler = this.createSelectionHandler.bind(this);
	}

	createSelectionHandler(dispatch: Dispatch<RootState>)
	{
		const addFuncCall = (funcDefId: number, event: React.MouseEvent<HTMLLIElement>) =>
		{
			dispatch(createAddFunctionCallAction(funcDefId));
		}
		return addFuncCall;
	}

	public render(): JSX.Element
	{
		// TODO: Should eventually be more than just function defs
		// and should go through a selector instead of accessing the data directly.
		let items: IItemInfo[] = [];
		for (let [id, funcDef] of this.props.rootState.functionsState.functions)
		{
			items.push({ id: id, displayText: funcDef.name });
		}
		return <DropDownSelector itemInfo={items}
		                         // TODO: Should I be calling this.createSelectionHandler.bind(this.props.dispatch)?
		                         selectionCallback={this.createSelectionHandler(this.props.dispatch)} />
	}
}

export default StatementPicker;
