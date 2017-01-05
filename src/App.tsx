import React, { Component } from 'react';
import './App.css';
import TextInput from './TextInput'

interface AppProps
{
}
interface AppState
{
}

class App extends Component<AppProps, AppState>
{
  render()
  {
    return (
      <div className="App">
        <p className="App-intro">
          Hello World.
        </p>
        <TextInput />
      </div>
    );
  }
}

export default App;
