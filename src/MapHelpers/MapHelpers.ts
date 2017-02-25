function copyMapWithAddedEntry<T, U>(originalMap: Map<T, U>, newKey: T, newValue: U): Map<T, U>
{
	return new Map<T, U>([...originalMap.entries(), [newKey, newValue]]);
}

function copyMapWithUpdatedValue<T, U>(originalMap: Map<T, U>, key: T, newValue: U): Map<T, U>
{
	let newMap = new Map<T, U>();
	newMap.set(key, newValue);
	for (let entry of originalMap.entries())
	{
		if(entry[0] != key)
		{
			newMap.set(entry[0], entry[1]);
		}
	}
	return newMap;
}

export { copyMapWithAddedEntry, copyMapWithUpdatedValue };
