import * as React from "react";
import { InputGroup, Input, InputGroupAddon } from 'reactstrap';

import { OnArgValueChangeCallback, IArgumentInputElementProps } from './ArgumentInputView';


function isNumeric(num: any)
{
	const numAsFloat = parseFloat(num);
	const numIsNaN = Number.isNaN(numAsFloat);
	const numIsFinite = Number.isFinite(numAsFloat);
	return !numIsNaN && numIsFinite;
}

interface IFloatArgumentViewState
{
	currentFormInput: string;
	inputIsValid: boolean;
}

class FloatArgumentView extends React.Component<IArgumentInputElementProps, IFloatArgumentViewState>
{
	constructor(props: IArgumentInputElementProps)
	{
		super(props);
		this.state = { inputIsValid: isNumeric(this.props.curValue), currentFormInput: this.props.curValue };

		this.createOnChangeHandler = this.createOnChangeHandler.bind(this);
	}

	createOnChangeHandler(defaultOnChangeCallback: OnArgValueChangeCallback)
	{
		return (event: React.FormEvent<HTMLInputElement>) =>
		{
			const newValue = event.currentTarget.value;
			const isValidNum = isNumeric(newValue);
			this.setState({ inputIsValid: isValidNum } as IFloatArgumentViewState);

			// Don't notify parent unless the input is a valid number
			if (isValidNum)
			{
				defaultOnChangeCallback(newValue);
			}
			else
			{
				this.setState({ currentFormInput: newValue } as IFloatArgumentViewState);
			}
		};
	}

	render(): JSX.Element
	{
		const onChange = this.createOnChangeHandler(this.props.onArgSetCallback);

		let errorMsg = null;
		let inputField;
		if (this.state.inputIsValid)
		{
			inputField = <Input className="hieroglyph-list-item"
			                    value={this.props.curValue}
			                    onChange={onChange} />
		}
		else
		{
			inputField = <Input className="error" value={this.state.currentFormInput} onChange={onChange} />
			errorMsg = <InputGroupAddon className="addon">Must be a floating point number</InputGroupAddon>;
		}

		return <InputGroup >
		           <InputGroupAddon className="addon">{this.props.name}:</InputGroupAddon>
		           {inputField}
		           {errorMsg}
			   </InputGroup>;
	}
}

export default FloatArgumentView;
