using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HieroglyphBackend
{
	static class Program
	{
		public static void Main(string[] args)
		{
			// TODO(awesson): Startup the front-end
			
			FrontEndListener.Start();

			// Block and wait for a new state, and then process it
			// When there are no more states (because the stream closed) the app will close.
			foreach (var state in FrontEndListener.RecieveStates())
			{
				ExportState(state);
			}
		}

		private static void ExportState(string state)
		{
			Console.WriteLine("Got new state:\n{0}", state);
			// TODO(awesson): Save state to disk for starting up the front-end next time.

			// TODO(awesson): Parse json state into code and save code to disk.
		}
	}
}
