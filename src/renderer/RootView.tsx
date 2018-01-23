import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import './index.scss';
import App from './App';
import RootState from './RootState';


function createView(store: Store<RootState>)
{
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('app')
	);
}

export { createView };
