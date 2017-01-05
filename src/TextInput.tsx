import React, { Component } from 'react';

interface TextInputProps
{
}

interface TextInputState
{
    text: string
}

class TextInput extends Component<TextInputProps, TextInputState>
{
  constructor(props: TextInputProps) {
    super(props);
    this.state = {text: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({text: event.currentTarget.value});
  }

  render()
  {
    return (
        <label>
            Enter Text:
            <input type="text" value={this.state.text} onChange={this.handleChange} />
        </label>
    );
  }
}

export default TextInput;