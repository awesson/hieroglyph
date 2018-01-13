import { Type } from '../../../Types';


export interface ArgumentDefState
{
	readonly name: string;
	readonly type: Type;
}

export function newArgumentDefState(name: string = "unnamed",
                                    type: Type = Type.String) : ArgumentDefState
{
	return { name, type };
}

export function getArgumentName(argDef: ArgumentDefState)
{
	return argDef.name;
}

export function getArgumentNames(argumentDefs: ArgumentDefState[])
{
	return argumentDefs.map(getArgumentName);
}

export function getArgumentType(argDef: ArgumentDefState)
{
	return argDef.type;
}

export function getArgumentTypes(argumentDefs: ArgumentDefState[])
{
	return argumentDefs.map(getArgumentType);
}


