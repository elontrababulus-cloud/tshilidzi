from PIL import Image
import os

def create_favicon(source_path, output_path):
    try:
        img = Image.open(source_path)
        
        # Determine new square size
        width, height = img.size
        new_size = max(width, height)
        
        # Create a new square transparent image
        new_img = Image.new("RGBA", (new_size, new_size), (0, 0, 0, 0))
        
        # Paste the original image in the center
        paste_x = (new_size - width) // 2
        paste_y = (new_size - height) // 2
        new_img.paste(img, (paste_x, paste_y))
        
        # Save as ICO (containing multiple sizes)
        new_img.save(output_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
        print(f"Successfully created {output_path}")
        
    except Exception as e:
        print(f"Error creating favicon: {e}")

if __name__ == "__main__":
    source = os.path.join("public", "branding.png")
    output = os.path.join("public", "favicon.ico")
    
    if os.path.exists(source):
        create_favicon(source, output)
    else:
        print(f"Source file not found: {source}")
