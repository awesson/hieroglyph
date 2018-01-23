import { Menu, MenuItem, BrowserWindow, ipcMain } from 'electron';

import Target from 'common/Compiler/Target';


export function setupMenu()
{
	const menuTemplate = [
		{
			label: 'File',
			submenu: [
				{ 
					label: 'transpile...',
					submenu: [
						{
							label: 'to Python',
							click: onTranspileToPythonClicked
						}
					]
				}
			]
		}
	];
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
}

function onTranspileToPythonClicked(menuItem: MenuItem, browserWindow: BrowserWindow, event: Event)
{
	transpile(browserWindow, Target.Python);
}

function transpile(browserWindow: BrowserWindow, targetLanguage:Target)
{
	browserWindow.webContents.send('compile', targetLanguage);
}
