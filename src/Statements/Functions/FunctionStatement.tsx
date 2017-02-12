import * as React from "react";

import './Function.css';


interface IFunctionStatementProps
{
	isSelected: boolean;
	selectedCallback: React.MouseEventHandler<any>;
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
		const cssClass = this.props.isSelected ? 'selected-boxed' : 'boxed';
		return <p>
		           <span className={cssClass} onClick={this.props.selectedCallback}>
		               {this.props.name}
		           </span>
		       </p>;
	}
}

export default FunctionStatement;
