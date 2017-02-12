import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import RootState from '../../RootState';
import FunctionCallInspectorView from './FunctionCallInspectorView';
import { IInspectorCompProps } from '../../Editors/Inspectors';

const mapStateToProps = (state: RootState, myProps: IInspectorCompProps) =>
{
	const funcCall = RootState.getFuncCall(state, myProps.concreteStatementId);
	const funcDef = RootState.getFuncDef(state, funcCall.funcDefId);
	return { funcCall, funcDef };
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>, myProps: IInspectorCompProps) =>
{
	return {};
}

export default connect(mapStateToProps, null)(FunctionCallInspectorView);
