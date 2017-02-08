import { Dispatch } from 'redux';
import { connect } from "react-redux";

import RootState from './../../RootState';
import FunctionStatement from './FunctionStatement';
import { IStatementViewProps } from '../StatementListContainer';


const mapStateToProps = (rootState: RootState, myProps: IStatementViewProps) =>
{
	const functionCall = RootState.getFuncCall(rootState, myProps.concreteStatementId);
	const func = RootState.getFuncDef(rootState, functionCall.funcDefId);
	return { name: func.name };
}

export default connect(mapStateToProps, null)(FunctionStatement);
