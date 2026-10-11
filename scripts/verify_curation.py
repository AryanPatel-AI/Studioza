import os
import glob
import re
import json

def verify():
    img_dir = 'frontend/public/images'
    files_in_dir = set(f for f in os.listdir(img_dir) if not f.startswith('.'))
    print(f"Total image files in {img_dir}: {len(files_in_dir)}")

    # 1. Check all references in frontend/src
    src_files = glob.glob('frontend/src/**/*', recursive=True)
    referenced_images = set()
    broken_references = []

    for sf in src_files:
        if os.path.isfile(sf) and sf.endswith(('.ts', '.tsx', '.js', '.jsx', '.json', '.astro', '.html', '.css')):
            with open(sf, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                matches = re.findall(r'/images/([a-zA-Z0-9_\-\.]+)', content)
                for m in matches:
                    clean_m = m.split('?')[0].split('#')[0]
                    # ignore non-image files if any
                    if any(clean_m.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.avif']):
                        referenced_images.add(clean_m)
                        if clean_m not in files_in_dir:
                            broken_references.append((sf, clean_m))

    print(f"Total unique referenced images in frontend/src: {len(referenced_images)}")
    print(f"Broken references in frontend/src: {len(broken_references)}")
    if broken_references:
        for b in broken_references:
            print("  Broken:", b)

    unreferenced = files_in_dir - referenced_images
    print(f"Unreferenced images in frontend/public/images: {len(unreferenced)}")
    if unreferenced:
        print("  Unreferenced files:", sorted(list(unreferenced)))

    # 2. Check scripts/editorial_captions.json
    with open('scripts/editorial_captions.json', 'r', encoding='utf-8') as f:
        captions = json.load(f)
    print(f"\nEditorial captions count: {len(captions)}")
    caption_filenames = set(c['filename'] for c in captions)
    caption_missing = caption_filenames - files_in_dir
    print(f"Captions referencing missing files: {len(caption_missing)}")
    if caption_missing:
        print("  Missing:", caption_missing)
    images_without_caption = files_in_dir - caption_filenames
    print(f"Images in public/images without caption: {len(images_without_caption)}")
    if images_without_caption:
        print("  Without caption:", images_without_caption)

    # 3. Check scripts/image_classification.json
    with open('scripts/image_classification.json', 'r', encoding='utf-8') as f:
        classifications = json.load(f)
    print(f"\nClassifications count: {len(classifications)}")
    class_filenames = set(c['filename'] for c in classifications)
    class_missing = class_filenames - files_in_dir
    print(f"Classifications referencing missing files: {len(class_missing)}")
    if class_missing:
        print("  Missing:", class_missing)
    images_without_class = files_in_dir - class_filenames
    print(f"Images in public/images without classification: {len(images_without_class)}")
    if images_without_class:
        print("  Without classification:", images_without_class)

    # 4. Check ARCHIVAL_PLATE_META in frontend/src/lib/data/studioData.ts
    with open('frontend/src/lib/data/studioData.ts', 'r', encoding='utf-8') as f:
        studio_data_text = f.read()

    print("\n--- Cross-checking Ground Truths ---")
    ground_truths = [
        ("hilltop-fortress-crest.jpg", "Jaigarh Fort taken from Amber Fort", ["jaigarh", "amber fort"]),
        ("aryan-patel-temple-monochrome.jpg", "Chittor Fort", ["chittor"]),
        ("palace-arch-courtyard.jpg", "Nahargarh Fort", ["nahargarh"]),
        ("21C0D227-0A17-44AD-9E71-7F2FF7C732D5.jpg", "Jageshwar Dham, Almora", ["jageshwar"]),
        ("5A9200AE-C6BF-4275-8C64-49875EC857D0.jpg", "Diwali", ["diwali", "lamp", "spark", "celebrat"]),
        ("27EF41EC-8FF5-4DAF-872B-8E8CDBF55246.jpg", "Rishikesh", ["rishikesh"]),
        ("IMG20250714135723.jpg", "Srinagar", ["srinagar"]),
        ("Dal_Lake.jpeg", "Dal Lake, Srinagar, Kashmir (NOT Amber Fort)", ["dal lake", "srinagar"]),
        ("temple-shikhara-oleander.jpg", "Chittor Fort / Almora", ["chittor", "almora", "jageshwar"]),
        ("pelicans-lake.jpg", "Jal Mahal Lake (Man Sagar)", ["man sagar", "jal mahal"]),
        ("IMG_0219.jpg", "Near Pulwama", ["pulwama"]),
        ("IMG_0386.jpg", "Sonamarg", ["sonamarg"]),
        ("fort-ramparts-overlook.jpg", "Nahargarh Fort", ["nahargarh"]),
        ("6AD1F81C-A785-44E1-BCC5-5DEBDF06A7D4_1_105_c.jpeg", "Amber Fort Sheesh Mahal", ["amber fort", "sheesh mahal", "aram bagh"]),
        ("B4690372-CCC6-4D10-897A-00B9BBB75713_1_105_c.jpeg", "Amber Fort Kesar Kyari", ["kesar kyari", "maota lake", "amber fort"]),
        ("0A0D9BAF-B62A-44B0-8277-A8CA18D75211_1_105_c.jpeg", "Jal Mahal", ["jal mahal", "man sagar"]),
        ("A18746B3-EA16-40EC-8D96-EC7F43C89F89.jpg", "Bareilly", ["bareilly"]),
        ("IMG_0017.jpg", "Near River / Rishikesh", ["river", "ganga", "rishikesh"])
    ]

    cap_by_fn = {c['filename']: c for c in captions}
    cls_by_fn = {c['filename']: c for c in classifications}

    for fn, desc, keywords in ground_truths:
        cap = cap_by_fn.get(fn)
        cls = cls_by_fn.get(fn)
        cap_loc = cap.get('location', '') if cap else ''
        cap_text = (cap.get('caption', '') + ' ' + cap.get('plate_title', '')) if cap else ''
        cls_loc = cls.get('location_name', '') if cls else ''
        cls_sub = cls.get('subject_description', '') if cls else ''

        full_text = f"{cap_loc} {cap_text} {cls_loc} {cls_sub}".lower()
        matched = any(k.lower() in full_text for k in keywords)
        
        # Specific check: Dal Lake must not mention Amber Fort
        if fn == "Dal_Lake.jpeg":
            if "amber fort" in full_text or "amber" in full_text:
                print(f"FAIL: Dal_Lake.jpeg mentions Amber Fort! Text: {full_text}")
                continue

        status = "PASS" if matched else "FAIL"
        print(f"[{status}] {fn}: expected '{desc}' | Found Cap Loc: '{cap_loc}' | Cls Loc: '{cls_loc}'")

    # 5. Tone Audit
    print("\n--- Tone Audit ---")
    banned_words = [
        "stunning", "capture your special day", "special day", "magical",
        "breathtaking", "unforgettable", "picture perfect", "timeless memories",
        "cherish forever", "dream wedding", "enchanting"
    ]
    exclamation_points = []
    buzzword_matches = []

    def check_text(source, text):
        for bw in banned_words:
            if bw in text.lower():
                buzzword_matches.append((source, bw, text[:100]))
        if "!" in text:
            # find sentence with exclamation mark
            for line in text.split("\n"):
                if "!" in line and not line.strip().startswith("//") and not line.strip().startswith("/*"):
                    exclamation_points.append((source, line.strip()))

    for c in captions:
        txt = f"{c.get('plate_title','')} {c.get('caption','')} {c.get('location','')}"
        check_text(f"Captions({c['filename']})", txt)

    for c in classifications:
        txt = f"{c.get('location_name','')} {c.get('subject_description','')}"
        check_text(f"Classifications({c['filename']})", txt)

    # Check studioData.ts for captions / titles / text
    check_text("studioData.ts", studio_data_text)

    print(f"Buzzword matches: {len(buzzword_matches)}")
    for b in buzzword_matches:
        print("  Buzzword found:", b)

    # Exclamations in captions or project titles/stories
    editorial_exclamations = [e for e in exclamation_points if "Captions" in e[0] or "Classifications" in e[0]]
    print(f"Editorial exclamations in captions/classifications: {len(editorial_exclamations)}")
    for e in editorial_exclamations:
        print("  Exclamation found in editorial:", e)

    print(f"Total exclamation points in studioData.ts: {len([e for e in exclamation_points if 'studioData' in e[0]])}")

if __name__ == '__main__':
    verify()
