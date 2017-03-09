import * as React from "react";


interface IFunctionStatementProps
{
	isSelected: boolean;
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
		return <div>{this.props.name}</div>;
	}
}

export default FunctionStatement;
