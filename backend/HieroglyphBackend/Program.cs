using System;
using System.Diagnostics;

namespace HieroglyphBackend
{
	static class Program
	{
		public static void Main(string[] args)
		{
			var process = RunServer();

			try
			{
				FrontEndListener.Start();

				// Block and wait for a new state, and then process it
				// When there are no more states (because the stream closed) the app will close.
				foreach (var state in FrontEndListener.RecieveStates())
				{
					ExportState(state);
				}
			}
			finally
			{
				if (process != null)
				{
					// TODO: This doesn't actually stop the node server.
					if (!process.HasExited)
					{
						process.Kill();
					}
					process.Close();
				}
			}
		}

		private static Process RunServer()
		{
			var process = new Process();
			var info = new ProcessStartInfo(@"C:\Program Files\nodejs\npm.cmd", "run start")
			           {
				           WorkingDirectory = @"..\..\..\..\frontend"
			           };
			process.StartInfo = info;
			process.Start();
			return process;
		}

		private static void ExportState(string state)
		{
			Console.WriteLine("Got new state:\n{0}", state);

			// TODO(awesson): Save state to disk for starting up the front-end next time.

			// TODO(awesson): Parse json state into code and save code to disk.
		}
	}
}
