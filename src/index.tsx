import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import RootState from './RootState';
import rootReducer from './RootReducer';

import App from './App';


let store = createStore(rootReducer, RootState.getAsPlainObject(new RootState()));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
