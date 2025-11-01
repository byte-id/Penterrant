import sys

if len(sys.argv) != 2:
    print(f"Usage: python {sys.argv[0]} <input_file>")
    sys.exit(1)

input_file = sys.argv[1]

with open(input_file, "r") as f:
    for line in f:
        line = line.strip()
        if ':' in line:
            user, hash_val = line.split(':', 1)
            print(f"{user}: {len(hash_val)}")
