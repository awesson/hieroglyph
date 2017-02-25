import * as React from "react";

import { Type } from '../../../Types';
import BooleanArgumentView from './BooleanArgumentView';
import FloatArgumentView from './FloatArgumentView';
import StringArgumentView from './StringArgumentView';


export type OnArgValueChangeCallback = (newValue: string) => void;

interface IArgumentInputElementProps
{
	argType: Type;
	curValue: string;
	onArgSetCallback: OnArgValueChangeCallback;
}

// TODO: Make this an actual component with a child component per type that has state that can handle input
const ArgumentInputElement = (props: IArgumentInputElementProps) =>
{
	let InputElement = null;

	switch(props.argType)
	{
		case Type.Boolean:
			InputElement = BooleanArgumentView;
		case Type.Float:
			InputElement = FloatArgumentView;
		case Type.Void:
			InputElement = null;
		case Type.String:
		default:
			InputElement = StringArgumentView;
	}

	return <InputElement curValue={props.curValue} onChange={props.onArgSetCallback}/>;
}

export default ArgumentInputElement;
