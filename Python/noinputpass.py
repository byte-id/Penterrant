# Splits password hashes and user name string into one pair per line, trimming whitespace
import sys

# Check arguments
if len(sys.argv) != 3:
    print(f"Usage: python {sys.argv[0]} <input_file> <output_file>")
    sys.exit(1)

input_file = sys.argv[1]
output_file = sys.argv[2]

# Read input file
with open(input_file, "r") as f:
    data = f.read()

# Split by commas and remove empty entries
pairs = data.strip(',').split(',')

# Write username:hash pairs to output file
with open(output_file, "w") as f:
    for pair in pairs:
        if ':' in pair:
            f.write(pair + "\n")

print(f"Saved {len(pairs)} entries to {output_file}")
