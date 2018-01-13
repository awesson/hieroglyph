import { Dispatch } from 'redux';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col } from 'reactstrap';

import RootState, { getStatementsState } from '../RootState';
import { StatementListContainer, StatementState } from '../Statements';
import getAllStatements = StatementState.getAllStatements;
import { StatementPicker } from '../ContextMenus';
import { InspectorContainer } from '../Editors/Inspectors';

import '../index.css';


interface IAppProps
{
	rootState: RootState;
	dispatch: Dispatch<RootState>;
}

interface IAppState
{
	displayStatementPicker: boolean;
	selectedStatementId: number;
}

const mapStateToProps = (rootState: RootState) =>
{
	return { rootState };
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) =>
{
	return { dispatch };
}

class App extends Component<IAppProps, IAppState>
{
	constructor(props: IAppProps)
	{
		super(props);
		this.state = { displayStatementPicker: false, selectedStatementId: -1 };

		this.handleClick = this.handleClick.bind(this);
		this.onStatementSelected = this.onStatementSelected.bind(this);
	}

	// TODO: Eventually this should be in an editor UI and the App can have multiple Editor contexts
	handleClick(event: React.MouseEvent<HTMLDivElement>)
	{
		event.preventDefault();
		const wasRightClick = (event.button == 2);
		this.setState({ displayStatementPicker: wasRightClick } as IAppState);

		if (!wasRightClick)
		{
			// TODO: How can I avoid calling this when something else was clicked as well??
			//this.setState({selectedStatementId: -1} as IAppState);
		}
	}

	onStatementSelected(statementId: number, event: React.MouseEvent<any>)
	{
		event.preventDefault();
		this.setState({selectedStatementId: statementId} as IAppState);
	}

	render(): JSX.Element
	{
		// For now we display all the statements, becauase we only have the notion of one
		// editor/function def. Eventually this app should render an editor which represents
		// a function def or potentially a type with a set of statements and this statement list
		// would only have those statements.
		let allStatementIds: number[] = [];
		const allStatements = getAllStatements(getStatementsState(this.props.rootState));
		for (const id in allStatements)
		{
			allStatementIds.push(parseInt(id));
		}

		let contextMenu = null;
		if (this.state.displayStatementPicker)
		{
			contextMenu = <StatementPicker />
		}

		return (
			<Container fluid>
				<Row>
					<Col className="editor-section" onClick={this.handleClick} onContextMenu={this.handleClick}>
						<p className="header">RIGHT CLICK TO ADD STATEMENTS!</p>
						<StatementListContainer statements={allStatementIds}
												selectedStatementId={this.state.selectedStatementId}
												selectedCallback={this.onStatementSelected}
												listItems={[]} />
						{contextMenu}
					</Col>
					<Col className="editor-section">
						<InspectorContainer statementId={this.state.selectedStatementId} comp={null} viewProps={null} />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
