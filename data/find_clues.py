import os

input_file = '/home/tofu/personal/b4n-after/data/b4nafter.db.txt'
output_file = '3-word-clues.txt'

with open(input_file, 'r') as f:
    for line in f:
        stripped_line = line.strip()
        if not stripped_line: 
            continue
        tokens = stripped_line.split()
        # Check that there are at least 4 tokens
        if len(tokens) < 4:
            continue

        # Condition d: first three must be words (alphabetic)
        valid_word = all(token.isalpha() for token in tokens[:3])
        # Condition e: one of the rest must be '3'
        found_three = tokens[3] == '3'

        if valid_word and found_three:
            with open(output_file, 'a') as out_f:
                out_f.write(line)
