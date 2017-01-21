interface AddFunctionCallAction
{
	type: "AddFunctionCallAction";
	funcDefId: number;
}

function createAddFunctionCallAction(funcDefId: number): AddFunctionCallAction
{
	return { type: "AddFunctionCallAction", funcDefId };
}

type AnyFunctionAction = AddFunctionCallAction;

export { AddFunctionCallAction, createAddFunctionCallAction, AnyFunctionAction };
