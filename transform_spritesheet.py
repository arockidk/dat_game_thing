import json
write = {
    "frames": {},
    "meta": {
        "image": "",
        "format": "RGBA8888",
        "size": {},
        "scale": 1
    },
}
image = input("Path to image: ")
frame_size = [ int(v) for v in input("Frame size (enter two numbers seperated by spaces): ").split() ]
fpr = int(input("Frames per row: "))
rows = int(input("Rows: "))
total_frames = int(input("Total frames: "))
frame_names = []
for i in range(total_frames):
    frame_names.append(input(f'Frame name of frame {i + 1}: '))
write["meta"]["image"] = image
write["meta"]["size"]["w"] = frame_size[0] * fpr
write["meta"]["size"]["h"] = frame_size[1] * rows

i = 0
j = 0
while ((i * fpr + j) < total_frames) and (i < rows):
    j = 0
    while ((i * fpr + j) < total_frames) and (j < fpr):
        frame = {}
        frame["frame"] = {
            'x': j * frame_size[0],
            'y': i * fpr * frame_size[1],
            'w': frame_size[0],
            'h': frame_size[1]
        }
        frame["sourceSize"] = {
            'w': frame_size[0],
            'h': frame_size[1]
        }
        frame["spriteSourceSize"] = {
            'x': 0,
            'y': 0,
            'w': frame_size[0],
            'h': frame_size[1]            
        }
        write["frames"][frame_names[i * fpr + j]] = frame
        j += 1
    i += 1
print(json.dumps(write, indent=4))