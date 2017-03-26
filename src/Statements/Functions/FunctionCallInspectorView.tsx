import * as React from "react";
import { Dispatch } from 'redux';
import { InputGroup, Input, InputGroupAddon } from 'reactstrap';

import RootState from '../../RootState';
import { Type } from '../../Types';
import { FunctionCallState, FunctionDefState, getFuncArgTypes } from './FunctionState';
import { ArgumentInputView, OnArgValueChangeCallback } from './Arguments';


export type SetArgValueCallback = (funcCallId: number, argIndex: number, argValue: string) => void;

interface IFunctionCallInspectorViewProps
{
	funcCallId: number;
	funcArgumentsCurValues: string[];
	funcName: string;
	funcArgumentTypes: Type[];
	funcArgumentNames: string[];
	setArgValue: SetArgValueCallback;
};

class FunctionCallInspectorView extends React.Component<IFunctionCallInspectorViewProps, {}>
{
	constructor(props: IFunctionCallInspectorViewProps)
	{
		super(props);

		this.createArgSetCallback = this.createArgSetCallback.bind(this);
		this.mapArgumentTypesToInputElements = this.mapArgumentTypesToInputElements.bind(this);
	}

	createArgSetCallback(setArgValue: SetArgValueCallback, funcCallId: number, argIndex: number)
	{
		return (argValue: string) => { setArgValue(funcCallId, argIndex, argValue) };
	}

	mapArgumentTypesToInputElements(argType: Type, index: number)
	{
		const onArgSetCallback = this.createArgSetCallback(this.props.setArgValue,
		                                                   this.props.funcCallId,
		                                                   index);
		return <ArgumentInputView key={this.props.funcCallId + "_" + index}
		                          argType={argType}
								  name={this.props.funcArgumentNames[index]}
		                          curValue={this.props.funcArgumentsCurValues[index]}
		                          onArgSetCallback={onArgSetCallback} />;
	}

	render(): JSX.Element
	{
		const args = this.props.funcArgumentTypes.map(this.mapArgumentTypesToInputElements);

		return <div>
		           <p>Inspecting: <b>{this.props.funcName}</b></p>
			       {args}
		       </div>;
	}
}

export default FunctionCallInspectorView;
