import Socket from 'socket.io-client';

import RootState from '../RootState';

function testConnection(socket: SocketIOClient.Socket)
{
	console.log('CONNECTED!');
}

export function start(initFunc:(initialStateJson: string) => void): SocketIOClient.Socket
{
	const socket = Socket();
	socket.on('connect', testConnection);
	socket.on('message', initFunc);
	return socket;
}

function save(socket: SocketIOClient.Socket, state: RootState)
{
	socket.send(JSON.stringify(state));
}

export function getSaveFunc(socket: SocketIOClient.Socket)
{
	return (state: RootState) =>
	{
		save(socket, state);
	}
}
