import * as React from "react";
import { InputGroup, Input, InputGroupAddon } from 'reactstrap';

import { OnArgValueChangeCallback, IArgumentInputElementProps } from './ArgumentInputView';


class StringArgumentView extends React.Component<IArgumentInputElementProps, {}>
{
	constructor(props: IArgumentInputElementProps)
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
		return <InputGroup>
		           <InputGroupAddon>{this.props.name}:</InputGroupAddon>
		           <Input value={this.props.curValue} onChange={this.handleOnChange(this.props.onArgSetCallback)} />
		       </InputGroup>;
	}
}

export default StringArgumentView;
