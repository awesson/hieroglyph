using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.Timers;

namespace HieroglyphBackend
{
	public static class FrontEndListener
	{
		private static readonly IPAddress s_IpAddress = IPAddress.Loopback;
		private const int PORT = 8000;

		private const string END_OF_MESSAGE_DELIMETER = "<eom>";
		private static readonly byte[] s_EndOfMessageDelimeter = Encoding.ASCII.GetBytes(END_OF_MESSAGE_DELIMETER);

		private static AsyncNetworkStreamReader s_Reader;
		public static bool IsRunning => s_Reader != null;

		// We only care about the latest state, so we only need to keep 1 state at a time
		private const int MAX_BUFFERED_MESSAGES = 1;
		private static readonly BlockingCollection<string> s_ReceivedStates = new BlockingCollection<string>(MAX_BUFFERED_MESSAGES);


		public static IEnumerable<string> RecieveStates()
		{
			string message;

			while (IsRunning)
			{
				if (s_ReceivedStates.TryTake(out message))
				{
					yield return message;
				}
			}

			// Try to get the message one more time after
			// the connection is closed in case there was one waiting.
			if (s_ReceivedStates.TryTake(out message))
			{
				yield return message;
			}
		}

		public static void Start()
		{
			if (IsRunning)
			{
				Stop();
			}

			s_Reader = new AsyncNetworkStreamReader(OnRecieveMessage, OnConnectionClosed);
			s_Reader.Connect(s_IpAddress, PORT, s_EndOfMessageDelimeter);
		}

		public static void Stop()
		{
			if (IsRunning)
			{
				s_Reader.Close();
				s_Reader = null;
			}
		}

		private static void OnRecieveMessage(byte[] message)
		{
			Console.WriteLine("Recieved message!");

			// We only care about sending the latest state we know about
			// so clear any state that wasn't yet consumed.
			string oldState;
			s_ReceivedStates.TryTake(out oldState);

			string newState;
			try
			{
				newState = Encoding.ASCII.GetString(message);
			}
			catch (Exception)
			{
				throw;
			}

			// This will always succeed as nothing else adds to it and we just cleared it.
			s_ReceivedStates.TryAdd(newState);
		}

		private static void OnConnectionClosed()
		{
			s_Reader = null;
		}
	}
}