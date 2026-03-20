from PIL import Image
import os

try:
    img_path = 'public/branding.png'
    if os.path.exists(img_path):
        with Image.open(img_path) as img:
            img = img.convert("RGBA")
            datas = img.getdata()
            newData = []
            for item in datas:
                # Change all white (also shades of whites) pixels to transparent
                if item[0] > 200 and item[1] > 200 and item[2] > 200:
                    newData.append((255, 255, 255, 0))
                else:
                    newData.append(item)
            img.putdata(newData)

            # Resize to max width 800px, keeping aspect ratio
            base_width = 800
            w_percent = (base_width / float(img.size[0]))
            h_size = int((float(img.size[1]) * float(w_percent)))
            img = img.resize((base_width, h_size), Image.Resampling.LANCZOS)
            img.save(img_path, "PNG")
            print(f"Resized image to {base_width}x{h_size} and removed background")
    else:
        print("File not found")
except Exception as e:
    print(f"Error: {e}")
