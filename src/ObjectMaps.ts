interface INumberMap<T>
{
	readonly [id: number]: T;
}

function next<T>(map: INumberMap<T>)
{
	// Iterator??
}

function newMapWithEntry<T>(map: INumberMap<T>, key: number, value: T) : INumberMap<T>
{
	return Object.assign({ ...map }, { [key]: value });
}

export { INumberMap, newMapWithEntry };
