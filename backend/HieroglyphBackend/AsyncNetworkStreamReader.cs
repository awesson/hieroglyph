using System;
using System.IO;
using System.Net;
using System.Net.Sockets;

namespace HieroglyphBackend
{
	public class AsyncNetworkStreamReader
	{
		public delegate void MessageReceivedDelegate(byte[] msg);
		private readonly MessageReceivedDelegate m_MessageReceivedDelegate;

		public delegate void ConnectionClosedDelegate();
		private readonly ConnectionClosedDelegate m_ConnectionClosedDelegate;
		
		private TcpClient m_ConnectedClient;
		private NetworkStream m_NetworkStream;

		private const int RECV_BUFFER_SIZE = 4098;
		private readonly byte[] m_ReadBuffer = new byte[RECV_BUFFER_SIZE];
		private byte[] m_MessageDelimeter;

		private readonly MemoryStream m_CurrentlyBuildingMessage = new MemoryStream();

		private string m_ConnectionIp;
		private int m_ConnectionPort;


		private bool Closed { get; set; }

		public AsyncNetworkStreamReader(MessageReceivedDelegate messageReceivedDelegate,
		                                ConnectionClosedDelegate connectionClosedDelegate)
		{
			m_MessageReceivedDelegate = messageReceivedDelegate;
			m_ConnectionClosedDelegate = connectionClosedDelegate;
		}

		public void Connect(IPAddress ipAddress, int port, byte[] messageDelimeter)
		{
			Connect(ipAddress.ToString(), port, messageDelimeter);
		}

		public void Connect(string ipAddress, int port, byte[] messageDelimeter)
		{
			// Don't start if we are already started
			if (m_NetworkStream != null)
			{
				return;
			}

			if (Closed)
			{
				throw new ObjectDisposedException("Tried to connect, but the underlying stream is already closed.");
			}

			m_ConnectionIp = ipAddress;
			m_ConnectionPort = port;
			m_MessageDelimeter = messageDelimeter;

			Console.WriteLine("Connecting to {0}:{1}...", ipAddress, port);
			m_ConnectedClient = new TcpClient();
			m_ConnectedClient.BeginConnect(ipAddress, port, OnConnectCallback, null);
		}

		public void Close()
		{
			InternalClose();
		}

		private void InternalClose(bool softClose = false)
		{
			if (Closed)
			{
				return;
			}
			
			m_ConnectedClient.Close();
			m_ConnectedClient = null;
			m_NetworkStream = null;

			if (!softClose)
			{
				m_ConnectionClosedDelegate?.Invoke();
				m_CurrentlyBuildingMessage.Dispose();
				Closed = true;
			}
		}

		private void Reconnect()
		{
			InternalClose(true);
			Connect(m_ConnectionIp, m_ConnectionPort, m_MessageDelimeter);
		}

		private void OnConnectCallback(IAsyncResult ar)
		{
			try
			{
				// Complete the connection.
				m_ConnectedClient.EndConnect(ar);

				Console.WriteLine("Socket connected to {0}", m_ConnectedClient.Client.RemoteEndPoint);
			}
			catch (SocketException e)
			{
				Console.WriteLine("Failed to connect: {0}", e);
				Console.WriteLine("The other end of the socket may not be setup yet. Retrying...");

				Reconnect();
				return;
			}
			catch (ObjectDisposedException e)
			{
				Console.WriteLine("Failed to connect: {0}", e);
				Console.WriteLine("Socket was closed before finishing connection.");

				Close();
				return;
			}
			catch (Exception)
			{
				Close();
				throw;
			}

			m_NetworkStream = m_ConnectedClient.GetStream();
			Read();
		}

		private void Read()
		{
			try
			{
				Console.WriteLine("Beginning read loop...");
				m_NetworkStream.BeginRead(m_ReadBuffer, 0, RECV_BUFFER_SIZE, ReadCallback, null);
			}
			catch (IOException)
			{
				Close();
			}
			catch (ObjectDisposedException e)
			{
				Console.WriteLine("Failed to read from stream: {0}", e);
				Close();
			}
		}

		private void ReadCallback(IAsyncResult ar)
		{
			int bytesRead;
			Console.WriteLine("In read callback");

			try
			{
				// Read data from the remote device.
				bytesRead = m_NetworkStream.EndRead(ar);
				Console.WriteLine("Read {0} bytes", bytesRead);

				if (bytesRead <= 0)
				{
					Console.WriteLine("Remote stream closed.");
					Close();
					return;
				}
			}
			catch (ObjectDisposedException)
			{
				Console.WriteLine("Stream closed.");
				// Make sure it's all fully disposed anyway
				Close();
				return;
			}
			catch (Exception e)
			{
				Console.WriteLine("Error reading from stream: {0}", e);
				Console.WriteLine("Closing stream...");
				Close();
				return;
			}

			try
			{
				ProcessReadBytes(bytesRead);
			}
			catch (Exception e)
			{
				Console.WriteLine("Error parsing stream: {0}", e);
				Console.WriteLine("Closing stream...");
				Close();
				return;
			}

			Read();
		}

		private void ProcessReadBytes(int bytesRead)
		{
			if (bytesRead > 0)
			{
				// Look for the end of a message.
				var startIndex = 0;
				var endIndex = m_ReadBuffer.FindSequence(startIndex, bytesRead, m_MessageDelimeter);
				while (endIndex >= 0)
				{
					// Found the end of the current message.
					// Write out the last part of the message.
					m_CurrentlyBuildingMessage.Write(m_ReadBuffer, startIndex, endIndex - startIndex);

					// Read the whole message into a byte array to be passed to the delegate.
					m_CurrentlyBuildingMessage.Seek(0, SeekOrigin.Begin);
					var message = new byte[m_CurrentlyBuildingMessage.Length];
					m_CurrentlyBuildingMessage.Read(message, 0, message.Length);

					m_MessageReceivedDelegate(message);

					// Clear the stream so we can start building the next message
					m_CurrentlyBuildingMessage.Seek(0, SeekOrigin.Begin);
					m_CurrentlyBuildingMessage.SetLength(0);

					startIndex = endIndex + m_MessageDelimeter.Length;
					endIndex = m_ReadBuffer.FindSequence(startIndex, bytesRead, m_MessageDelimeter);
				}

				// Append the next section of the message to the message we are building
				m_CurrentlyBuildingMessage.Write(m_ReadBuffer, startIndex, RECV_BUFFER_SIZE - startIndex);
			}
		}
	}
}