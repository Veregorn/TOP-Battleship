# TOP-Battleship
Implementation of the classic game ‘Battleship’ in Javascript. Battleship is a strategy type guessing game for two players. It is played on ruled grids on which each player's fleet of warships are marked. The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player's ships, and the objective of the game is to destroy the opposing player's fleet.

## Description
The game is displayed in two 10x10 squared game boards, one for each player. On one grid the player arranges ships and records the shots by the opponent. On the other grid, the player records their own shots. Before play begins, each player secretly arranges their ships on their primary grid. Each ship occupies a number of consecutive squares on the grid, arranged either horizontally or vertically. The number of squares for each ship is determined by the type of ship. The ships cannot overlap (i.e., only one ship can occupy any given square in the grid).

## Types os Ships
No.	  Class of ship   Size
1	  Carrier	        5
2	  Battleship	    4
3	  Destroyer	        3
4	  Submarine	        3
5	  Patrol Boat	    2

## Development Info
Design Pattern: Modules and Factory Functions
Webpack for file and resources management
Tests Drive Development Applied

## IA Info
I have used a hunt and target strategy for a non human player. Details are explained at this source:
http://www.datagenetics.com/blog/december32011/