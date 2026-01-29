# Description

Create a React App that will let the user play a series of 5 word puzzles. One word in the puzzle will be missing, which the user will need to provide to solve the puzzle. The words before and after the missing word will both be related to the missing word. This is commonly referred to as a "Before and After" puzzle, as both things relate to the missing word. The user will have 30 seconds to complete the each puzzle. They will be awarded one star for each puzzle they successfully complete before the time runs out.

## Spec

Create a mobile React App that displays 5 rows by 10 columns of single letter boxes in a grid. A timer should be visible on top of the grid, counting down from 30 seconds.

The program should select 5 rows from the following file for each new instance of the game:
/home/tofu/personal/b4n-after/data/3-word-clues.txt

The 3 words should be centered in the grid, with the 2nd word missing and the 1st and 3rd displayed. The characters should contrast from the square holding them. Each square will contain one character. There should be a keyboard prompt the user can use on a mobile device. Hitting enter will submit the word. If the word entered is the 2nd word from the file they got the answer correct. If guessed correctly, load the next line in the same fashion. If the answer is wrong, make the screen shake briefly, but do not load the next line into the grid. If this is the 5th answer they got correct before 30 seconds, report their total time and show a number of stars on a screen indicating the completion of the game. If the user runs out of 30 seconds before giving all 5 answers, show a linear number of stars equal to the number of answers they guessed correctly.

## Caveats
