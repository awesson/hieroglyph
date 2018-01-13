import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import RootState, { getFunctionsState } from '../RootState';
import { createAddFunctionCallAction, getAllFuncDefs } from '../Statements/Functions'
import DropDownSelector, { IItemInfo } from './DropDownSelector'


const mapStateToProps = (rootState: RootState) =>
{
	// TODO: Should eventually be more than just function defs.
	let itemInfos: IItemInfo[] = [];
	const funcDefs = getAllFuncDefs(getFunctionsState(rootState));
	for (let id in funcDefs)
	{
		const funcDef = funcDefs[id];
		const info = { id: parseInt(id), displayText: funcDef.name };
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
