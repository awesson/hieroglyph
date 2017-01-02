import React, { Component } from 'react';
import './App.css';

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
      </div>
    );
  }
}

export default App;
