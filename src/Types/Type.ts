const enum Type
{
	String,
	Float,
	Boolean,
	Void
}

function getDefaultValue(type: Type)
{
	switch (type)
	{
		case Type.Float:
			return "0";
		case Type.Boolean:
			return "false";
		default:
			return "";
	}
}

function mapToDefaultValues(typeList: Type[]): string[]
{
	return typeList.map(getDefaultValue);
}

export { Type, mapToDefaultValues };
