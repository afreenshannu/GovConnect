import os

# Path to dataset
dataset_path = "final_dataset"

# Path to labels folder
labels_path = os.path.join(dataset_path, "labels")

# Collect all unique class IDs from labels
class_ids = set()

for split in ["train", "valid", "test"]:
    split_path = os.path.join(labels_path, split)
    if not os.path.exists(split_path):
        print(f" Warning: {split_path} does not exist, skipping...")
        continue

    for file in os.listdir(split_path):
        if file.endswith(".txt"):
            with open(os.path.join(split_path, file), "r") as f:
                for line in f.readlines():
                    parts = line.strip().split()
                    if len(parts) > 0:
                        class_ids.add(int(parts[0]))

class_ids = sorted(list(class_ids))
print("Found class IDs:", class_ids)

# Ask user to name classes
class_names = [input(f"Enter name for class {i}: ") for i in class_ids]

# Create YAML content
yaml_content = f"""
train: ./images/train
val: ./images/valid
test: ./images/test

nc: {len(class_names)}
names: {class_names}
"""

# Save to file
yaml_path = os.path.join(dataset_path, "data.yaml")
with open(yaml_path, "w") as f:
    f.write(yaml_content)

print(f"\n data.yaml file created successfully at {yaml_path}")
