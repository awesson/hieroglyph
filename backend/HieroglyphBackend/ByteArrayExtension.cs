using System;

namespace HieroglyphBackend
{
	public static class ByteArrayExtension
	{
		public static int FindSequence(this byte[] bytes, byte[] sequence)
		{
			return FindSequence(bytes, 0, bytes.Length, sequence);
		}

		public static int FindSequence(this byte[] bytes, int startIndex, int count, byte[] sequence)
		{
			var endIndex = Math.Min(startIndex + count, bytes.Length);
			for (var mainIndex = startIndex; mainIndex < endIndex; ++mainIndex)
			{
				var foundMatch = true;
				for (var seqIndex = 0; seqIndex < sequence.Length; ++seqIndex)
				{
					if (bytes[mainIndex + seqIndex] != sequence[seqIndex])
					{
						foundMatch = false;
						break;
					}
				}

				if (foundMatch)
				{
					return mainIndex;
				}
			}

			return -1;
		}
	}
}