import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

import { setupMenu } from './AppMenu';


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null;

function initDevTools()
{
	if (!mainWindow)
	{
		return;
	}

	mainWindow.webContents.openDevTools();

	// It looks relative to the working directory even with the %LOCALAPPDATA% env variable,
	// so just hard coding the drive and user here :(
	let extensionsLoc = path.join(
		'C:',
		'Users',
		'Andrew',
		'AppData',
		'Local',
		'Google',
		'Chrome',
		'User Data',
		'Default',
		'Extensions');
	if (process.platform === 'darwin')
	{
		extensionsLoc = path.join(
			'/Users',
			'andrew',
			'Library',
			'Application Support',
			'Google',
			'Chrome',
			'Default',
			'Extensions');
	}
	// react
	BrowserWindow.addDevToolsExtension(path.join(extensionsLoc, "fmkadmapgofadopljbjfkapdkoienihi", "2.5.2_0"));
	// redux
	BrowserWindow.addDevToolsExtension(path.join(extensionsLoc, "lmhkpmbekcpmknklioeibfkpmmfibljd", "2.15.1_0"));
}

function createWindow()
{
	// Create the browser window.
	mainWindow = new BrowserWindow({width: 1600, height: 900});

	const devEnv = process.env.NODE_ENV !== 'production';
	let urlPath: string;

	// and load the index.html of the app.
	if (devEnv)
	{
		urlPath = url.format({
			pathname: `localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`,
			protocol: 'http:',
			slashes: true
		});
	}
	else
	{
		urlPath = url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        });
	}
	mainWindow.loadURL(urlPath);

	if (devEnv)
	{
		initDevTools();
	}

	// Emitted when the window is closed.
	mainWindow.on('closed', function()
	{
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});

	setupMenu();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function()
{
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin')
	{
		app.quit();
	}
});

app.on('activate', function()
{
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null)
	{
		createWindow();
	}
});
