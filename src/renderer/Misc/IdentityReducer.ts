import { Action } from "redux";


function identityReducer<T>(defaultValue: T)
{
	return (state: T = defaultValue, action: Action) =>
	{
		return state;
	}
}

export default identityReducer;
