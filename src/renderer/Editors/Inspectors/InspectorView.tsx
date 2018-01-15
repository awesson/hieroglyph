import * as React from "react";
import { connect } from "react-redux";


export interface IInspectorCompProps
{
	concreteStatementId: number;
}

export interface IInspectorViewConnectedProps
{
	comp: React.ComponentClass<IInspectorCompProps>;
	viewProps: IInspectorCompProps;
}

// Without subtraction types, this needs to be defined here for the rest of the typechecking to work :(
export interface IInspectorViewOwnProps
{
	statementId: number;
}

type IInspectorViewProps = IInspectorViewConnectedProps & IInspectorViewOwnProps;

class InspectorView extends React.Component<IInspectorViewProps, {}>
{
	public render(): JSX.Element
 	{
		// Check if there isn't A statement selected
		if (this.props.viewProps.concreteStatementId < 0)
		{
			return <p className="header">SELECT A STATMENT TO INSPECT</p>;
		}

		const InspectorCompType = this.props.comp;
		return <InspectorCompType {...this.props.viewProps} />
	}
}

export default InspectorView;
