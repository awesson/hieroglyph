import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import RootState from '../../RootState';
import { getFuncCall, getFuncCallDef, getFuncArgTypes, getFuncArgNames } from './FunctionState';
import FunctionCallInspectorView, { SetArgValueCallback } from './FunctionCallInspectorView';
import { createSetFunctionCallArgumentAction } from './FunctionActions';
import { IInspectorCompProps } from '../../Editors/Inspectors';

const mapStateToProps = (state: RootState, myProps: IInspectorCompProps) =>
{
	const funcCall = getFuncCall(state, myProps.concreteStatementId);
	const funcCallId = funcCall.myId;
	const funcArgumentsCurValues = funcCall.passedArguments;
	const funcDef = getFuncCallDef(state, funcCall);
	const funcName = funcDef.name;
	const funcArgumentTypes = getFuncArgTypes(funcDef);
	const funcArgumentNames = getFuncArgNames(funcDef);
	return { funcCallId, funcArgumentsCurValues, funcName, funcArgumentTypes, funcArgumentNames };
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
