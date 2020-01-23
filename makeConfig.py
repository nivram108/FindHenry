import os
import json

assets = []
checkList = []
# for index,name in enumerate(os.listdir("images/maps")[:1000]):
#     vals = name.split('.')
#     x,y = tuple(int(x) for x in vals[1].split('_'))
#     assets.append("{id:'%d', src:'images/maps/%s'},"%(index,name))
#     checkList.append([x,y])
#
# print("\n".join(assets))
# print(checkList)

# ans = open("../../../imageGenerator/bin/Debug/netcoreapp3.1/ans.txt", "r")
ans = open("imageGenerator/answer.txt", "r")
lines = ans.readlines()
image_cnt = int(lines[0])
# image_cnt = 25
asset_prev = open("src/AssetScriptPrev.txt", "r")
asset_script = open("src/Asset.js", "w")
asset_after = open("src/AssetScriptAfter.txt", "r")

lines = asset_prev.readlines()
for line in lines:
    asset_script.writelines(line)

for x in range(0, image_cnt):
    asset_script.writelines("{id:'" + str(x) + "'	, src:'imageGenerator/image/" + str(x) + ".png'}," + "\n")
    # asset_script.writelines("{id:'" + str(x) + "'	, src:'images/maps/" + str(x) + ".png'}," + "\n")

lines = asset_after.readlines()
for line in lines:
    asset_script.writelines(line)


game_prev = open("src/gameScriptPrev.txt", "r")
game_script = open("src/game.js", "w")
game_after = open("src/gameScriptAfter.txt", "r")
ans = open("imageGenerator/answer.txt", "r")

lines = game_prev.readlines()
for line in lines:
    game_script.writelines(line)

lines = ans.readlines()

is_count = True
for line in lines:
    if is_count == True:
        is_count = False
    else:
        if line == lines[-1]:
            line = line.replace("],", "]")
        game_script.writelines(line)

lines = game_after.readlines()
for line in lines:
    game_script.writelines(line)
