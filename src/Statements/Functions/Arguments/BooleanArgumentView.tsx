import * as React from "react";
import { Input } from 'reactstrap';

import { OnArgValueChangeCallback } from './ArgumentInputView';


interface IBooleanArgumentViewProps
{
	curValue: string;
	onChange: OnArgValueChangeCallback;
};

class BooleanArgumentView extends React.Component<IBooleanArgumentViewProps, {}>
{
	constructor(props: IBooleanArgumentViewProps)
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
		const onChange = this.handleOnChange(this.props.onChange);
		return <Input type="select" value={this.props.curValue} onChange={onChange}>
                   <option>True</option>
                   <option>False</option>
               </Input>;
	}
}

export default BooleanArgumentView;
