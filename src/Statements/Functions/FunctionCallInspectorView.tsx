import * as React from "react";
import { Dispatch } from 'redux';
import { InputGroup, Input, InputGroupAddon } from 'reactstrap';

import RootState from '../../RootState';
import { Type } from '../../Types';
import { FunctionCallState, FunctionDefState } from './FunctionState';
import { ArgumentInputView, OnArgValueChangeCallback } from './Arguments';


export type SetArgValueCallback = (funcCallId: number, argIndex: number, argValue: string) => void;

interface IFunctionCallInspectorViewProps
{
	funcCall: FunctionCallState;
	funcDef: FunctionDefState;
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
		                                                   this.props.funcCall.myId,
		                                                   index);
		// TODO: Pass current argument value? Pass/derive default?
		return <ArgumentInputView key={index}
		                          argType={argType}
		                          curValue={this.props.funcCall.passedArguments[index]}
		                          onArgSetCallback={onArgSetCallback} />;
	}

	render(): JSX.Element
	{
		const args = this.props.funcDef.argumentTypes.map(this.mapArgumentTypesToInputElements);

		return <div>
		           <p>Inspecting: <b>{this.props.funcDef.name}</b></p>
			       {args}
		       </div>;
	}
}

export default FunctionCallInspectorView;
