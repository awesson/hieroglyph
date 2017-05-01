import Socket from 'socket.io-client';

import RootState from '../RootState';

function testConnection(socket: SocketIOClient.Socket)
{
	console.log('CONNECTED!');
}

export function start(): SocketIOClient.Socket
{
	const socket = Socket();
	socket.on('connect', testConnection);
	socket.on('message', receivedState);
	return socket;
}

export function receivedState(stateJson: string)
{
	console.log("received state:", stateJson);
}

function save(socket: SocketIOClient.Socket, state: RootState)
{
	// TODO(aweson): Send the json
}

export function getSaveFunc(socket: SocketIOClient.Socket, state: RootState)
{
	return (state: RootState) =>
	{
		save(socket, state);
	}
}
