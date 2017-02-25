import * as React from "react";
import { InputGroup, Input, InputGroupAddon } from 'reactstrap';

import { OnArgValueChangeCallback } from './ArgumentInputView';


interface IFloatArgumentViewProps
{
	curValue: string;
	onChange: OnArgValueChangeCallback;
}

interface IFloatArgumentViewState
{
	inputIsValid: boolean;
}

class FloatArgumentView extends React.Component<IFloatArgumentViewProps, IFloatArgumentViewState>
{
	constructor(props: IFloatArgumentViewProps)
	{
		super(props);
		this.state = { inputIsValid: false };

		this.createOnChangeHandler = this.createOnChangeHandler.bind(this);
	}

	private isNumeric(num: any)
	{
  		return !Number.isNaN(parseFloat(num)) && Number.isFinite(num);
	}

	createOnChangeHandler(defaultOnChangeCallback: OnArgValueChangeCallback)
	{
		return (event: React.FormEvent<HTMLInputElement>) =>
		{
			const newValue = event.currentTarget.value;
			const isValidNum = this.isNumeric(newValue);
			this.setState({inputIsValid: isValidNum});

			// Don't notify parent unless the input is a valid number
			if(isValidNum)
			{
				return defaultOnChangeCallback(newValue);
			}
		};
	}

	render(): JSX.Element
	{
		const onChange = this.createOnChangeHandler(this.props.onChange);

		let errorMsg = null;
		let inputField;
		if(this.state.inputIsValid)
		{
			inputField = <Input value={this.props.curValue} onChange={onChange} />
		}
		else
		{
			inputField = <Input onChange={onChange} />
			errorMsg = <InputGroupAddon>Must be a floating point number</InputGroupAddon>;
		}

		return <InputGroup>
		           {inputField}
		           {errorMsg}
			   </InputGroup>;
	}
}

export default FloatArgumentView;
