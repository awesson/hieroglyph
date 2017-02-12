import * as React from "react";
import { connect } from 'react-redux';

import { StatementState } from '../../Statements';
import RootState from '../../RootState';
import InspectorView, { IInspectorViewProps } from './InspectorView';


interface IInspectorContainerProps
{
	statementId: number;
}

const mapStateToProps = (rootState: RootState, myProps: IInspectorContainerProps) =>
{
	// Check if there isn't a selected statement
	if(myProps.statementId < 0)
	{
		return {comp: null, viewProps: {concreteStatementId: myProps.statementId}};
	}

	const statement = RootState.getStatement(rootState, myProps.statementId);
	const jsxType = StatementState.getInspectorContainerComponent(statement);
	const viewProps:IInspectorViewProps = {comp: jsxType, viewProps: {concreteStatementId: statement.concreteStatementId}};
	return viewProps;
}

export default connect(mapStateToProps, null)(InspectorView);
