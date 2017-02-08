import { FunctionsState } from './FunctionState';
import { AnyFunctionAction } from './FunctionActions';

function functionReducer(state = new FunctionsState(), action: AnyFunctionAction)
{
	switch (action.type)
	{
		case "AddFunctionCallAction":
			return FunctionsState.withNewFunctionCall(state, action.funcDefId);
		default:
			//const _exhaustiveCheck: never = action;
			return state;
	}
}

export default functionReducer;
