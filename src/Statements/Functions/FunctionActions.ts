import { Type } from '../../Types';
import DefaultAction from '../../Misc/DefaultAction'


interface SetFunctionCallArgumentAction
{
	type: "SetFunctionCallArgumentAction";
	funcCallId: number;
	argIndex: number;
	argValue: string;
}

function createSetFunctionCallArgumentAction(funcCallId: number,
                                             argIndex: number,
                                             argValue: string): SetFunctionCallArgumentAction
{
	return { type: "SetFunctionCallArgumentAction", funcCallId, argIndex, argValue };
}

type AnyFunctionCallAction = SetFunctionCallArgumentAction | DefaultAction;


interface SetFunctionDefArgumentTypeAction
{
	type: "SetFunctionDefArgumentTypeAction";
	funcDefId: number;
	argIndex: number;
	argType: Type;
}

function createSetFunctionDefArgumentTypeAction(funcDefId: number,
                                                argIndex: number,
											    argType: Type): SetFunctionDefArgumentTypeAction
{
	return { type: "SetFunctionDefArgumentTypeAction", funcDefId, argIndex, argType };
}

type AnyFunctionDefAction = SetFunctionDefArgumentTypeAction | DefaultAction;


interface AddFunctionCallAction
{
	type: "AddFunctionCallAction";
	funcDefId: number;
}

function createAddFunctionCallAction(funcDefId: number): AddFunctionCallAction
{
	return { type: "AddFunctionCallAction", funcDefId };
}

type AnyFunctionAction = AddFunctionCallAction | AnyFunctionCallAction | AnyFunctionDefAction;

export
{
	AddFunctionCallAction,
	createAddFunctionCallAction,
	AnyFunctionAction,
	SetFunctionCallArgumentAction,
	createSetFunctionCallArgumentAction,
	AnyFunctionCallAction,
	AnyFunctionDefAction
};
