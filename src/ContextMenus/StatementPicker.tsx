import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import RootState from '../RootState';
import { createAddFunctionCallAction } from '../Statements/Functions'
import DropDownSelector, { IItemInfo } from './DropDownSelector'


interface IStatementPickerProps
{
	rootState: RootState;
	dispatch: Dispatch<RootState>;
}

const mapStateToProps = (rootState: RootState) =>
{
	// TODO: Should eventually be more than just function defs
	// and should go through a selector instead of accessing the data directly.
	let itemInfos: IItemInfo[] = [];
	for (let [id, funcDef] of rootState.functionsState.functions)
	{
		const info = { id: id, displayText: funcDef.name };
		itemInfos.push(info);
	}
	return { itemInfos };
}

const createSelectionHandler = (dispatch: Dispatch<RootState>) =>
{
	const addFuncCall = (id: number, event: React.MouseEvent<HTMLLIElement>) =>
	{
		dispatch(createAddFunctionCallAction(id));
	}
	return addFuncCall;
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) =>
{
	const selectionCallback = createSelectionHandler(dispatch);
	return { selectionCallback }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownSelector);
