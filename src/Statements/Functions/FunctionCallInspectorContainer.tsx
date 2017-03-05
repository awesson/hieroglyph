import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import RootState from '../../RootState';
import { getFuncCall, getFuncDef } from './FunctionState';
import FunctionCallInspectorView, { SetArgValueCallback } from './FunctionCallInspectorView';
import { createSetFunctionCallArgumentAction } from './FunctionActions';
import { IInspectorCompProps } from '../../Editors/Inspectors';

const mapStateToProps = (state: RootState, myProps: IInspectorCompProps) =>
{
	const funcCall = getFuncCall(state, myProps.concreteStatementId);
	const funcDef = getFuncDef(state, funcCall.funcDefId);
	return { funcCall, funcDef };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>, myProps: IInspectorCompProps) =>
{
	const setArgValue: SetArgValueCallback = (funcCallId: number, argIndex: number, argValue: string) =>
	{
		dispatch(createSetFunctionCallArgumentAction(funcCallId, argIndex, argValue));
	};
	return { setArgValue };
};

export default connect(mapStateToProps, mapDispatchToProps)(FunctionCallInspectorView);
