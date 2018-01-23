import { remote } from 'electron';
import fs from 'fs';
import path from 'path';

import { Store } from 'redux';
import { initRootState, RootState } from '../RootState';

// TEMP
// There is a bug in electron-webpack where the name of the app isn't set. Hard coding it here for now.
const userDataDir = path.join(remote.app.getPath('userData'), '..', 'hieroglyph');
console.log(userDataDir);
// /TEMP
const tempDir = remote.app.getPath('temp');

function writeFileWithPromise(filename: string, fileContents: string, encoding: string)
{
	return new Promise((resolve, reject) =>
	{
		fs.writeFile(filename, fileContents, encoding, (err) =>
		{
			if (err)
			{
				reject(err);
			}
			else
			{
				resolve(filename);
			}
		});
	});
}

function renameFileWithPromise(oldName:string, newName: string)
{
	return new Promise((resolve, reject) =>
	{
		fs.rename(oldName, newName, (err) =>
		{
			if (err)
			{
				reject(err);
			}
			else
			{
				resolve(newName);
			}
		});
	});
}

function unlinkFileWithPromise(filename: string)
{
	return new Promise((resolve, reject) =>
	{
		fs.unlink(filename, (err) =>
		{
			if (err)
			{
				reject(err);
			}
			else
			{
				resolve(filename);
			}
		});
	});
}

// Note: Not thread safe for the same file
let runningOverwrites:Set<string> = new Set<string>();
let pendingOverwrites:Map<string, IArguments> = new Map<string, IArguments>();
function overwriteFile(filename: string, fileContents: string, encoding: string)
{
	if (runningOverwrites.has(filename))
	{
		pendingOverwrites.set(filename, arguments);
		return;
	}
	runningOverwrites.add(filename);

	const tempLoc = path.join(tempDir, path.basename(filename) + '.tmp');

	// If the write to the temp file succeeds, move it to the real location
	const onWriteSuccess = () =>
	{
		return renameFileWithPromise(tempLoc, filename);
	}
	// If the overwrite fails at any point, make sure to remove the temp file
	const onWriteFail = (err: NodeJS.ErrnoException) =>
	{
		console.log('overwrite failed. -- ' + err);
		return unlinkFileWithPromise(tempLoc);
	}
	// Once the overwrite is complete, mark it as such and potentially start the next waiting overwrite
	const onOverwriteComplete = () =>
	{
		// Mark this overwrite as no longer running
		runningOverwrites.delete(filename);

		// Check if there are any pending overwrites to start
		const args = pendingOverwrites.get(filename);
		if (args)
		{
			pendingOverwrites.delete(filename);

			// Removing type checking here under the assumption that the only IArguments being added to
			// pendingOverwrites is for the arguments in a call to overwriteFile.
			(<any>overwriteFile)(...args);
		}
	}

	writeFileWithPromise(tempLoc, fileContents, encoding)
		.then(onWriteSuccess)
		.catch(onWriteFail)
		.then(onOverwriteComplete)
		.catch(err => {}); // If the cleanup from a failure fails, we don't really care
}

const storeFileEncoding = 'utf8';
const storeSaveFileName = path.join(userDataDir, 'store.json');
function saveStore(store: Store<RootState>)
{
	const stateJson = JSON.stringify(store.getState());
	overwriteFile(storeSaveFileName, stateJson, storeFileEncoding);
}

function loadStore(): RootState
{
	try
	{
		const fileContents = fs.readFileSync(storeSaveFileName, storeFileEncoding);
		return JSON.parse(fileContents);
	}
	catch (error)
	{
		return initRootState();
	}
}

const sourceFileEncoding = 'utf8';
const compiledSourceFileName = path.join(userDataDir, 'source.');
function writeSourceFile(source: string, extension: string)
{
	overwriteFile(compiledSourceFileName + extension, source, sourceFileEncoding);
}

export default
{
	writeSourceFile,
	saveStore,
	loadStore
};
