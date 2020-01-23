/*
The MIT License(MIT)
Copyright(c) mxgmn 2016.
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
*/

using System.Drawing.Imaging;
using System;
using System.IO;
using System.Xml.Linq;
using System.Diagnostics;

public static class Program
{
	public static int answerX;
	public static int answerY;
    static void Main()
    {
		int stageCount = 25;
        Stopwatch sw = Stopwatch.StartNew();
		String timeStamp = "";// DateTime.Now.ToString("yyyyMMddHHmmssffff");
		Random random = new Random();
		XDocument xdoc = XDocument.Load("samples.xml");
		using (StreamWriter w = File.CreateText("answer.txt"))
		{
			w.WriteLine(stageCount.ToString());
		}
		int counter = 1;
        foreach (XElement xelem in xdoc.Root.Elements("overlapping", "simpletiled"))
        {
            Model model;
            string name = xelem.Get<string>("name");
            Console.WriteLine($"< {name}");

            if (xelem.Name == "overlapping") 
                model = new OverlappingModel(name, xelem.Get("N", 2), xelem.Get("width", 48), xelem.Get("height", 48),
                xelem.Get("periodicInput", true), xelem.Get("periodic", false), xelem.Get("symmetry", 8), xelem.Get("ground", 0));
            else if (xelem.Name == "simpletiled") 
                model = new SimpleTiledModel(timeStamp, name, xelem.Get<string>("subset"),
                xelem.Get("width", 10), xelem.Get("height", 10), xelem.Get("periodic", false), xelem.Get("black", false));
            else continue;

            for (int i = 0; i < xelem.Get("screenshots", stageCount); i++)
            {
                for (int k = 0; k < 10; k++)
                {
                    Console.Write("> ");
                    int seed = random.Next();
                    bool finished = model.Run(seed, xelem.Get("limit", 0));
                    if (finished)
                    {
                        Console.WriteLine("DONE");

						//model.Graphics().Save($"{counter} {name} {i}.png");
						//model.Graphics().Save("image/" + i + ".png");
						string outputFileName = "image/" + i + ".png";
						using (MemoryStream memory = new MemoryStream())
						{
							using (FileStream fs = new FileStream(outputFileName, FileMode.Create, FileAccess.ReadWrite))
							{
								model.Graphics().Save(memory, ImageFormat.Png);
								byte[] bytes = memory.ToArray();
								fs.Write(bytes, 0, bytes.Length);
							}
						}
						if (model is SimpleTiledModel && xelem.Get("textOutput", false))
                            System.IO.File.WriteAllText($"{counter} {name} {i}.txt", (model as SimpleTiledModel).TextOutput());

                        break;
                    }
                    else Console.WriteLine("CONTRADICTION");
                }
            }

            counter++;
        }

        Console.WriteLine($"time = {sw.ElapsedMilliseconds}");
    }

	
}
