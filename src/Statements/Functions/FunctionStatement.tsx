import * as React from "react";

import { IStatementCompProps } from '../StatementListContainer';



export interface IFunctionStatementProps extends IStatementCompProps
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
