# FindHenry
---

## Introduction
![](https://i.imgur.com/E8QB4d2.png)

FindHenry is a game that you have to find your friend, Henry
![](https://i.imgur.com/HnoXRiZ.png)
in the fantansy world. 

---

## Instructions
### Environment
Before building the application, you need:
 - .Net 3.1
 - python 3.7
----
### Build
To build the application, you need to execute:
 1.  ```{project_folder}/game/imageGenerator/WaveFunctionCollapse.csproj```
 2.  ```{project_folder}/game/makeConfig.py```

----
### Gameplay
Run ```{project_folder}/index.html```To launch the game.
![](https://i.imgur.com/lPSLoth.png)

After clicking anywhere on the game window, the game will start and count your score beneath.
![](https://i.imgur.com/L17DzA0.png)

Find Henry![](https://i.imgur.com/HnoXRiZ.png) and click him to earn score and move to next stage, clicking elsewhere will lose a score.

The world is generated randomly using WaveFunctionCollapse function.

----

## How to change content

 - **Change the content of each stage**
     Rebuild the application will regenerate the content of each stage randomly
 - **Change the maximum stage**
     Change the parameter ```stageCount``` in ```{project_folder}/game/imageGenerator/Main.cs```
     ```c sharp
     ...
     static void Main()
    {
        int stageCount = 25;
        ...
     ```
     which is set to 25 currently
 - **Change image pack**
    put your image pack in ```{project_folder}/game/imageGenerator/samples```
    and add your image pack name to  ```{project_folder}/game/imageGenerator/samples.xml``` with parameters.
    Remind that you have to set your own image pack rule as ```data.xml``` in your image pack folder
