import { ipcRenderer } from 'electron';
import { Store } from 'redux';

import PythonCompiler from './PythonCompiler';
import RootState from '../RootState';
import Target from 'common/Compiler/Target';


export function initCompiler(store: Store<RootState>)
{
	ipcRenderer.on('compile', (event: Event, target: Target) => compile(store.getState(), target));
}

function compile(state: RootState, target: Target)
{
	var success = false;

	switch(target)
	{
		case Target.Python:
			success = PythonCompiler.compile(state);
			break;
		default:
			console.log("invalid compile target: "+ target);
			break;
	}

	return success;
}


