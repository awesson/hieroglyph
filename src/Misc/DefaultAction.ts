// To handle the fact that the redux Action type can have any type,
// this placeholder action acts as the default case without conflicting with the actual action types in AllActions.
// This makes typescript happy when calling createStore, which expects an action of type Action,
// with our root reducer, which exects an action of type AllActions.
interface DefaultAction
{
	type: '';
}

export default DefaultAction;
