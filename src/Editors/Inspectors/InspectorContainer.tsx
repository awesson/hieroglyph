import * as React from "react";
import { connect } from 'react-redux';

import { StatementState } from '../../Statements';
import RootState from '../../RootState';
import InspectorView, { IInspectorViewConnectedProps, IInspectorViewOwnProps } from './InspectorView';
import getStatement = StatementState.getStatement;


const mapStateToProps = (rootState: RootState, myProps: IInspectorViewOwnProps) =>
{
	// Check if there isn't a selected statement
	if (myProps.statementId < 0)
	{
		return { comp: null, viewProps: { concreteStatementId: myProps.statementId } };
	}

	const statement = getStatement(rootState, myProps.statementId);
	const jsxType = StatementState.getInspectorContainerComponent(statement);
	const viewProps:IInspectorViewConnectedProps =
	      {
		      comp: jsxType,
		      viewProps: { concreteStatementId: statement.concreteStatementId }
	      };
	return viewProps;
}

export default connect(mapStateToProps, null)(InspectorView);
