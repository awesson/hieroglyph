import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import './index.scss';
import App from './App';


function createView(store: Store<any>)
{
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('app')
	);
}

export { createView };
