import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
//import throttle from 'lodash/throttle';

import { initRootState, RootState } from './RootState';
import rootReducer from './RootReducer';
import ClientConnection from './ClientConnection';
import App from './App';


const socket = ClientConnection.start(init);

function init(initialStateJson: string)
{
	// const obj = JSON.parse(initialStateJson);
	// startRendering(obj);
}

function getSaveFunc(store: Store<RootState>)
{
	const saveFunc = ClientConnection.getSaveFunc(socket);
	return () =>
	{
		saveFunc(store.getState());
	}
}

function startRendering(initialState: RootState)
{
	if (initialState == null)
	{
		initialState = initRootState();
	}

	const castWindow = window as any;
	const store = createStore(rootReducer,
	                          initialState,
	                          // Needed for the redux firefox plugin to work
	                          castWindow.devToolsExtension && castWindow.devToolsExtension());

//	store.subscribe(throttle(getSaveFunc(store), 1000));

	ReactDOM.render(
		<Provider store={store}>
		    <App />
		</Provider>,
		document.getElementById('root')
	);
}

// TODO: Should be getting this from the client, but first I need to figure
// out how to add built-in functions to the state object in such a way that
// the client doesn't need to duplicate logic for updating the state.
// For now start with an empty state every time.
startRendering(null);
