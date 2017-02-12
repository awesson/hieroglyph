import * as React from "react";
import { Dispatch } from 'redux';
import { InputGroup, Input, InputGroupAddon } from 'reactstrap';

import RootState from '../../RootState';
import { Type } from '../../Types';
import { FunctionCallState, FunctionDefState } from './FunctionState';


interface IFunctionCallInspectorViewProps
{
	funcCall: FunctionCallState;
	funcDef: FunctionDefState;
};

class FunctionCallInspectorView extends React.Component<IFunctionCallInspectorViewProps, {}>
{
	constructor(props: IFunctionCallInspectorViewProps)
	{
		super(props);
	}

	render(): JSX.Element
	{
		const mapArgumentTypesToInputElements = (argType: Type, index: number) =>
		{
			return <ArgumentInputElement key={index} argType={argType}/>;
		}
		const args = this.props.funcDef.argumentTypes.map(mapArgumentTypesToInputElements);

		return <div className="boxed">
			       {args}
		       </div>;
	}
}

interface IArgumentInputElementProps
{
	argType: Type;
}

// TODO: Make this an actual component with a child component per type that has state that can handle input
const ArgumentInputElement = (props: IArgumentInputElementProps) =>
{
	switch(props.argType)
	{
		case Type.Boolean:
			return <Input type="select">
                       <option>True</option>
                       <option>False</option>
                   </Input>;
		case Type.Float:
		case Type.String:
		default:
			return <Input />;
		case Type.Void:
			return null;
	}
}

export default FunctionCallInspectorView;
