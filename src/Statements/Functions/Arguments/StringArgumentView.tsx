import * as React from "react";
import { InputGroup, Input, InputGroupAddon } from 'reactstrap';

import { OnArgValueChangeCallback } from './ArgumentInputView';


interface IStringArgumentViewProps
{
	curValue: string;
	onChange: OnArgValueChangeCallback;
}

class StringArgumentView extends React.Component<IStringArgumentViewProps, {}>
{
	constructor(props: IStringArgumentViewProps)
	{
		super(props);

		this.handleOnChange = this.handleOnChange.bind(this);
	}

	handleOnChange(onChangeCallback: OnArgValueChangeCallback)
	{
		return (event: React.FormEvent<HTMLInputElement>) =>
		{
			onChangeCallback(event.currentTarget.value);
		};
	}

	render(): JSX.Element
	{
		return <Input value={this.props.curValue} onChange={this.handleOnChange(this.props.onChange)} />
	}
}

export default StringArgumentView;
