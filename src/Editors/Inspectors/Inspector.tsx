import * as React from "react";
import { Dispatch } from 'redux';

import { StatementType } from '../../Statements';
import RootState from '../../RootState';
import FunctionCallInspector from './FunctionCallInspector';


interface IInspectorProps
{
	rootState: RootState;
	dispatch: Dispatch<RootState>;
	statementId: number;
}

class Inspector extends React.Component<IInspectorProps, {}>
{
	constructor(props: IInspectorProps)
	{
		super(props);
	}

	public render(): JSX.Element
	{
		const statement = RootState.getStatement(this.props.rootState, this.props.statementId);
		let inspectorUI:JSX.Element = null;
		switch(statement.type)
		{
			case StatementType.FunctionCall:
				const funcCall = RootState.getFuncCall(this.props.rootState,
				                                       statement.concreteStatementId);
				inspectorUI = <FunctionCallInspector funcCall={funcCall}
				                                     dispatch={this.props.dispatch} />;
			default:
				inspectorUI = null;
		}

		return inspectorUI;
	}
}

export default Inspector;
