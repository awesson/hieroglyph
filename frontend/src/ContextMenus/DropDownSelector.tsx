import * as React from "react";
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';


export interface IItemInfo
{
	id: number;
	displayText: string;
}

export type ItemSelectedCallback = (id: number, event: React.MouseEvent<HTMLLIElement>) => void;

interface IDropDownSelectorProps
{
	itemInfos: IItemInfo[];
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
			return <DropdownItem key={info.id} onClick={itemSelectionHandler}>
				       {info.displayText}
			       </DropdownItem>;
		}
		const selectionItems = this.props.itemInfos.map(mapFunc);

		return <Dropdown isOpen={true} toggle={() => {}}>
			       <DropdownMenu right>
		               {selectionItems}
				   </DropdownMenu>
			   </Dropdown>;
	}
}

export default DropDownSelector;
