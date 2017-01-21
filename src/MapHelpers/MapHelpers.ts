function copyMapWithAddedEntry<T, U>(originalMap: Map<T, U>, newKey: T, newValue: U): Map<T, U>
{
	return new Map<T, U>([...originalMap.entries(), [newKey, newValue]]);
}

export { copyMapWithAddedEntry };
