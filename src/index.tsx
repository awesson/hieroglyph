import 'bootstrap/dist/css/bootstrap.css';
import throttle from 'lodash/throttle';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import FileOps from './FileOps/FileOps';
import rootReducer from './RootReducer';
import { initRootState, RootState } from './RootState';


const autoSaveIntervalMS = 1000;

const castWindow = window as any;
const store = createStore(
	rootReducer,
	FileOps.loadStore(),
	// Needed for the redux firefox plugin to work
	castWindow.devToolsExtension && castWindow.devToolsExtension());

function saveStore()
{
	FileOps.saveStore(store);
}
store.subscribe(throttle(saveStore, autoSaveIntervalMS));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
