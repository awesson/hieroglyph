import * as React from "react";
import { Input } from 'reactstrap';

import { OnArgValueChangeCallback, IArgumentInputElementProps } from './ArgumentInputView';


class BooleanArgumentView extends React.Component<IArgumentInputElementProps, {}>
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
		const onChange = this.handleOnChange(this.props.onArgSetCallback);
		return <Input type="select" value={this.props.curValue} onChange={onChange}>
                   <option>True</option>
                   <option>False</option>
               </Input>;
	}
}

export default BooleanArgumentView;
