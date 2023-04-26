import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

/* global test, expect, beforeEach */

let myBoard;

beforeEach(() => {
  myBoard = Gameboard();
  myBoard.createBoard();
});

test("Board has been created but there is no ships on it. All the squares are 'Water'", () => {
    for (let i = 0; i < 100; i += 1) {
        expect(myBoard.getSquare(i)).toBe("Water")
    }
})

test("A ship placed into the limits of the board is correctly placed (horizontally)", () => {
    const carrier = Ship("Carrier",5)
    let j = 25
    myBoard.placeShip(carrier,j,"x")
    for (let i = 1; i <= carrier.getLength(); i += 1) {
        expect(myBoard.getSquare(j)).toBe("Carrier")
        j += 1
    }
    expect(myBoard.getSquare(68)).toBe("Water") // Next to (after)
    expect(myBoard.getSquare(62)).toBe("Water") // Next to (before)
})

test("A ship placed into the limits of the board is correctly placed (vertically)", () => {
    const destroyer = Ship("Destroyer",3)
    let j = 70
    myBoard.placeShip(destroyer,j,"y")
    for (let i = 1; i <= destroyer.getLength(); i += 1) {
        expect(myBoard.getSquare(j)).toBe("Destroyer")
        j += 10
    }
    expect(myBoard.getSquare(10)).toBe("Water") // Next to (after)
    expect(myBoard.getSquare(50)).toBe("Water") // Next to (before)
})

test("Placing a ship out of the limits (y axis)", () => {
    expect(() => myBoard.placeShip(Ship("Destroyer",3),80,"y"))
        .toThrow(/^You are exceeding the limits of the board$/)
})

test("Placing a ship out of the limits (x axis)", () => {
    expect(() => myBoard.placeShip(Ship("Destroyer",3),18,"x"))
        .toThrow(/^You are exceeding the limits of the board$/)
})

test("Receives and attack and a ship is hit", () => {
    const battleship = Ship("Battleship",4)
    myBoard.placeShip(battleship,74,"x")
    myBoard.receiveAttack(7,7)
    expect(battleship.getHits()).toBe(1)
    expect(myBoard.getSquare(77)).toBe("Battleship-Hit")
})

test("Receives and attack and no ship is hit", () => {
    myBoard.receiveAttack(7,7)
    expect(myBoard.getSquare(77)).toBe("Hit")
})

test("All the ships have been sunk", () => {
    const battleship = Ship("Battleship",4)
    myBoard.placeShip(battleship,74,"x")
    myBoard.receiveAttack(7,4)
    myBoard.receiveAttack(7,5)
    myBoard.receiveAttack(7,6)
    myBoard.receiveAttack(7,7)
    expect(myBoard.getGameOver()).toBeTruthy()
})