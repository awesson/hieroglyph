import { Dispatch } from 'redux';
import React, { Component } from 'react';
import { connect } from "react-redux";

import RootState from '../RootState';
import { StatementListContainer } from '../Statements';
import { StatementPicker } from '../ContextMenus';

import './App.css';


interface IAppProps
{
	rootState: RootState;
	dispatch: Dispatch<RootState>;
}

interface IAppState
{
	displayStatementPicker: boolean;
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
		this.state = { displayStatementPicker: false };

		this.handleClick = this.handleClick.bind(this);
	}

	// TODO: Eventually this should be in an editor UI and the App can have multiple Editor contexts
	handleClick(event: React.MouseEvent<HTMLDivElement>)
	{
		event.preventDefault();
		const wasRightClick = (event.button == 2);
		this.setState({ displayStatementPicker: wasRightClick });
	}

	render()
	{
		// For now we display all the statements, becauase we only have the notion of one
		// editor/function def. Eventually this app should render an editor which represents
		// a function def or potentially a type with a set of statements and this statement list
		// would only have those statements.
		let statements: number[] = [];
		for (const [id, statement] of this.props.rootState.statementsState.statements)
		{
			statements.push(id);
		}

		let contextMenu = null;
		if (this.state.displayStatementPicker)
		{
			contextMenu = <StatementPicker />
		}

		return (
			<div className="App" onClick={this.handleClick} onContextMenu={this.handleClick}>
				<p className="App-intro">Right click to add statements!</p>
				<StatementListContainer statements={statements} />
				{contextMenu}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
