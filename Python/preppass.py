# Takes input and outfile user prompt, username/password string hash, one pair per line trimming whitespace

# Ask user for filenames
input_file = input("Enter input filename: ").strip()
output_file = input("Enter output filename: ").strip()

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
