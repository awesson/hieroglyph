import * as React from "react";

import './Function.css'

interface IFunctionStatementProps
{
	name: string;
};

class FunctionStatement extends React.Component<IFunctionStatementProps, {}>
{
	constructor(props: IFunctionStatementProps)
	{
		super(props);
	}

	render(): JSX.Element
	{
		let ele = <div className="boxed">{this.props.name}</div>;
		return <li>{ele}</li>;
	}
}

export default FunctionStatement;
