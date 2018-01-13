import throttle from 'lodash/throttle';
import { createStore } from 'redux';

import FileOps from './FileOps/FileOps';
import rootReducer from './RootReducer';
import { createView } from './RootView';


const autoSaveIntervalMS = 1000;

const castWindow = window as any;
const store = createStore(
	rootReducer,
	FileOps.loadStore(),
	// Needed for the redux firefox plugin to work
	castWindow.devToolsExtension && castWindow.devToolsExtension());

const saveStore = () =>
{
	FileOps.saveStore(store);
}
store.subscribe(throttle(saveStore, autoSaveIntervalMS));

createView(store);
