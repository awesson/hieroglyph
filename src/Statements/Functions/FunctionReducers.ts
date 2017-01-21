import { FunctionState } from './FunctionState';
import { AnyFunctionAction } from './FunctionActions';

function functionReducer(state = new FunctionState(), action: AnyFunctionAction)
{
	switch (action.type)
	{
		case "AddFunctionCallAction":
			return FunctionState.withNewFunctionCall(state, action.funcDefId);
		default:
			return state;
	}
}

export default functionReducer;
