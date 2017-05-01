const io = require('socket.io');


function startWebsocketServer(httpServer)
{
	const websocketServer = io(httpServer);

	const onConnection = (socket) =>
	{
		console.log('socket connected: ', socket.client.conn.id);
		websocketServer.send('Testing 1 2 3<eom>');
	}

	websocketServer.on('connection', onConnection);

	websocketServer.on('error', function(error) {
		console.log(error);
	});

	return websocketServer;
}

module.exports = {
	startWebsocketServer
}
