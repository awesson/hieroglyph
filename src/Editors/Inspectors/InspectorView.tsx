import * as React from "react";
import { connect } from "react-redux";


export interface IInspectorCompProps
{
	concreteStatementId: number;
}

export interface IInspectorViewProps
{
	comp: React.ComponentClass<IInspectorCompProps>;
	viewProps: IInspectorCompProps;
}

class InspectorView extends React.Component<IInspectorViewProps, {}>
{
	public render(): JSX.Element
 	{
		// Check if there isn't A statement selected
		if (this.props.viewProps.concreteStatementId < 0)
		{
			return <span>Select a statement to inspect</span>;
		}

		const InspectorCompType = this.props.comp;
		return <InspectorCompType {...this.props.viewProps} />
	}
}

export default InspectorView;
