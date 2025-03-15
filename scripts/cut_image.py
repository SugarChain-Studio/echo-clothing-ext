import os
from PIL import Image

# Define the directories
dir = "resources/Assets/Female3DCG/Hat"
prefix = "女巫帽子_Luzi_"

# Define the crop parameters
crop_width = 500
crop_height = 350
crop_x = 0
crop_y = 160


def crop_image(source_path, destination_path, width, height, x, y):
    """Crop an image and save it to the destination path."""
    with Image.open(source_path) as img:
        if img.width < x + width or img.height < y + height:
            print("Error: Crop dimensions exceed image dimensions.")
            return
        cropped_img = img.crop((x, y, x + width, y + height))
    cropped_img.save(destination_path)


# Get the list of files in each directory
files1 = [f for f in os.listdir(dir) if f.startswith(
    prefix) and f.endswith(".png")]

# Crop images in the first directory
for file_name in files1:
    file_path1 = os.path.join(dir, file_name)
    crop_image(file_path1, file_path1, crop_width,
               crop_height, crop_x, crop_y)


print("Cropping completed.")
