import { IFunctionStatementProps } from './FunctionStatement';
import { Dispatch } from 'redux';
import { connect } from "react-redux";

import RootState, { getFunctionsState } from './../../RootState';
import { getFuncCall, getFuncDef } from './FunctionState';
import FunctionStatement from './FunctionStatement';
import { IStatementCompProps } from '../StatementListContainer';


const mapStateToProps = (rootState: RootState, myProps: IStatementCompProps) =>
{
	const functionsState = getFunctionsState(rootState);
	const functionCall = getFuncCall(functionsState, myProps.concreteStatementId);
	const func = getFuncDef(functionsState, functionCall.funcDefId);
	const name = func.name;
	return { name };
}

export default connect(mapStateToProps)(FunctionStatement);
