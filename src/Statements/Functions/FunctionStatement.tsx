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
		return <p><span className='boxed'>{this.props.name}</span></p>;
	}
}

export default FunctionStatement;
