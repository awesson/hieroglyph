import * as React from "react";

import { Type } from '../../../Types';
import BooleanArgumentView from './BooleanArgumentView';
import FloatArgumentView from './FloatArgumentView';
import StringArgumentView from './StringArgumentView';


export type OnArgValueChangeCallback = (newValue: string) => void;

export interface IArgumentInputElementProps
{
	name: string;
	curValue: string;
	onArgSetCallback: OnArgValueChangeCallback;
}

interface IArgumentInputViewProps extends IArgumentInputElementProps
{
	argType: Type;
}

// TODO: Make this an actual component with a child component per type that has state that can handle input
const ArgumentInputElement = (props: IArgumentInputViewProps) =>
{
	let InputElement: React.ComponentClass<IArgumentInputElementProps> = StringArgumentView;

	switch (props.argType)
	{
		case Type.Boolean:
			InputElement = BooleanArgumentView;
			break;
		case Type.Float:
			InputElement = FloatArgumentView;
			break;
		case Type.Void:
		case Type.String:
		default:
			InputElement = StringArgumentView;
			break;
	}

	return <InputElement name={props.name} curValue={props.curValue} onArgSetCallback={props.onArgSetCallback}/>;
}

export default ArgumentInputElement;
