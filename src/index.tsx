import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
//import throttle from 'lodash/throttle';

import { initRootState, RootState } from './RootState';
import rootReducer from './RootReducer';
import App from './App';


const castWindow = window as any;
const store = createStore(rootReducer,
                          initRootState(),
                          // Needed for the redux firefox plugin to work
                          castWindow.devToolsExtension && castWindow.devToolsExtension());

//	store.subscribe(throttle(getSaveFunc(store), 1000));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
