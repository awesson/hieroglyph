import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import { initRootState } from './RootState';
import rootReducer from './RootReducer';

import App from './App';

const castWindow = window as any;
const store = createStore(rootReducer,
                          initRootState(),
						  // Needed for the redux firefox plugin to work
                          castWindow.devToolsExtension && castWindow.devToolsExtension());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
