const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function initDevToos(mainWindow)
{
	mainWindow.webContents.openDevTools();

	// It looks relative to the working directory even with the %LOCALAPPDATA% env variable,
	// so just hard coding the drive and user here :(
	let extensionsLoc = path.join('C:',
									'Users',
									'Andrew',
									'AppData',
									'Local',
									'Google',
									'Chrome',
									'User Data',
									'Default',
									'Extensions');
	if (process.platform == 'darwin')
	{
		extensionsLoc = path.join('/Users',
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

	// and load the index.html of the app.
	if (process.env.NODE_ENV === 'production')
	{
		mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
        }));
	}
	else
	{
		if (process.env.ELECTRON_START_URL)
		{
			mainWindow.loadURL(process.env.ELECTRON_START_URL);
		}
		else
		{
			mainWindow.loadURL('http://localhost:3000');
		}

		initDevToos(mainWindow);
	}

	// Emitted when the window is closed.
	mainWindow.on('closed', function()
	{
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	})
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
