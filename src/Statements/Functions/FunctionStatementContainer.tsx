import { Dispatch } from 'redux';
import { connect } from "react-redux";

import RootState from './../../RootState';
import { getFuncCall, getFuncDef } from './FunctionState';
import FunctionStatement from './FunctionStatement';
import { IStatementCompProps } from '../StatementListContainer';


const mapStateToProps = (rootState: RootState, myProps: IStatementCompProps) =>
{
	const isSelected = myProps.isSelected;

	const selectedCallback = myProps.selectedCallback;

	const functionCall = getFuncCall(rootState, myProps.concreteStatementId);
	const func = getFuncDef(rootState, functionCall.funcDefId);
	const name = func.name;

	return { isSelected, selectedCallback, name };
}

export default connect(mapStateToProps, null)(FunctionStatement);
