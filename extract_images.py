import urllib.request
import re
import os
import urllib.parse

urls = [
    'https://werbsolutions.com/',
    'https://werbsolutions.com/about',
    'https://werbsolutions.com/electrical-services',
    'https://werbsolutions.com/solar-%26-eco-services',
    'https://werbsolutions.com/construction-services'
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
out_dir = r'c:\Users\pablo\Documents\werbsolutions\extracted_images'
os.makedirs(out_dir, exist_ok=True)

images_found = {}

for u in urls:
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            matches = re.findall(r'(https?:)?//img1\.wsimg\.com/isteam/ip/[^\s"\'\)<>]+', html)
            for m in matches:
                full_m = re.sub(r'/:.*$', '', m)
                if full_m.startswith('//'):
                    full_m = 'https:' + full_m
                images_found[full_m] = u
    except Exception as e:
        print(f"Error reading {u}: {e}")

print(f"Total unique images: {len(images_found)}")

meta_file = os.path.join(out_dir, "images_inventory.txt")
with open(meta_file, "w", encoding="utf-8") as f_meta:
    for idx, (img_url, page_origin) in enumerate(images_found.items(), 1):
        raw_name = img_url.split('/')[-1]
        decoded_name = urllib.parse.unquote(raw_name)
        # sanitize filename
        clean_name = re.sub(r'[\\/*?:"<>|]', '_', decoded_name)
        if not clean_name.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.svg')):
            clean_name += ".jpg"
        
        file_path = os.path.join(out_dir, f"{idx:02d}_{clean_name}")
        print(f"[{idx}] Downloading: {clean_name} from {img_url}")
        try:
            req = urllib.request.Request(img_url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as resp:
                with open(file_path, "wb") as out_f:
                    out_f.write(resp.read())
            f_meta.write(f"{idx:02d}_{clean_name} | Origin: {page_origin} | URL: {img_url}\n")
        except Exception as e:
            print(f"Failed {img_url}: {e}")
            f_meta.write(f"FAILED: {img_url} ({e})\n")

print("Done extraction!")
