const net = require('net');


const port = 8000;

let sockets = [];
let webserver = null;

function onNewSocketConn(socket)
{
	console.log("got tcp connection!");

	// Add the new client socket connection to the array of sockets
	sockets.push(socket);

	socket.on('error', function(error) {
		console.log(error);
	});

	// 'data' is an event that means that a message was just sent by the 
	// client application
	socket.on('data', webserver.send);

	// Use splice to get rid of the socket that is ending.
	// The 'end' event means tcp client has disconnected.
	socket.on('end', function () {
		const i = sockets.indexOf(socket);
		sockets.splice(i, 1);
	});

	socket.write('Testing 123<eom>');
}

// Create a TCP socket listener
function startTcpServer(websocketServer)
{
	webserver = websocketServer;

	const tcpServer = net.Server(onNewSocketConn);
	tcpServer.listen(port);

	return tcpServer;
}

module.exports = {
	startTcpServer
}
