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

function getKeys<T>(map: INumberMap<T>)
{
	return Object.keys(map).map((str:string) => Number(str));
}

export { INumberMap, newMapWithEntry, getKeys };
