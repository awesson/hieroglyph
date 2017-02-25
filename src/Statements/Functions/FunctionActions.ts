import { Type } from '../../Types';

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

type AnyFunctionCallAction = SetFunctionCallArgumentAction;


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

type AnyFunctionDefAction = SetFunctionDefArgumentTypeAction;


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
