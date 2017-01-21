import * as React from "react";


export interface IItemInfo
{
	id: number;
	displayText: string;
}

export type ItemSelectedCallback = (id: number, event: React.MouseEvent<HTMLLIElement>) => void;

interface IDropDownSelectorProps
{
	itemInfo: IItemInfo[];
	selectionCallback: ItemSelectedCallback;
}

class DropDownSelector extends React.Component<IDropDownSelectorProps, {}>
{
	constructor(props: IDropDownSelectorProps)
	{
		super(props);
	}

	createSelectionHandler(id: number, parentCallbackFunc: ItemSelectedCallback)
	{
		return function (event: React.MouseEvent<HTMLLIElement>)
		{
			parentCallbackFunc(id, event);
		};
	}

	public render(): JSX.Element
	{
		const mapFunc = (info: IItemInfo) =>
		{
			const itemSelectionHandler = this.createSelectionHandler(info.id,
			                                                         this.props.selectionCallback);
			return <li key={info.id} onClick={itemSelectionHandler}>
				       {info.displayText}
			       </li>;
		}
		const selectionItems = this.props.itemInfo.map(mapFunc);

		return <ul>{selectionItems}</ul>;
	}
}

export default DropDownSelector;
