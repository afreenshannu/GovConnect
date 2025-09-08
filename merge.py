import os
import shutil

final_root = "final_dataset"
splits = ["train", "valid", "test"]

datasets = [d for d in os.listdir("ml_training") if os.path.isdir(
    os.path.join("ml_training", d))]
print("Found datasets:", datasets)

# Assign class IDs automatically
datasets_map = {datasets[i]: i for i in range(len(datasets))}
print("Class mapping:", datasets_map)

# Create final dataset structure
for split in splits:
    for sub in ["images", "labels"]:
        os.makedirs(f"{final_root}/{sub}/{split}", exist_ok=True)

# Process each dataset
for dataset, new_class in datasets_map.items():
    for split in splits:
        img_dir = f"ml_training/{dataset}/{split}/images"
        lbl_dir = f"ml_training/{dataset}/{split}/labels"

        if not os.path.exists(img_dir):
            print(f"Skipping {img_dir} (not found)")
            continue

        print(f"Copying from {img_dir} -> {final_root}/images/{split}")

        for img_file in os.listdir(img_dir):
            shutil.copy(
                os.path.join(img_dir, img_file),
                os.path.join(final_root, "images", split, img_file)
            )

        for lbl_file in os.listdir(lbl_dir):
            src = os.path.join(lbl_dir, lbl_file)
            dst = os.path.join(final_root, "labels", split, lbl_file)

            new_lines = []
            with open(src, "r") as f:
                for line in f:
                    parts = line.strip().split()
                    parts[0] = str(new_class)  # assign class ID
                    new_lines.append(" ".join(parts))

            with open(dst, "w") as f:
                f.write("\n".join(new_lines))
