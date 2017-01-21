import * as React from "react";
import { Dispatch } from 'redux';

import RootState from '../../RootState';
import { Functions } from '../../Statements'


interface IFunctionCallInspectorProps
{
	dispatch: Dispatch<RootState>;
	funcCall: Functions.FunctionCallState;
};

class FunctionCallInspector extends React.Component<IFunctionCallInspectorProps, {}>
{
	constructor(props: IFunctionCallInspectorProps)
	{
		super(props);
	}

	render(): JSX.Element
	{
		return <div className="boxed"></div>;
	}
}

export default FunctionCallInspector;
