import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

/* global test, expect */

test("Board has been created but there is no ships on it. All the squares are 'Water'", () => {
    const myBoard = Gameboard()
    myBoard.createBoard()
    for (let i = 0; i < 100; i += 1) {
        expect(myBoard.getSquare(i)).toBe("Water")
    }
})

test("A ship placed into the limits of the board is correctly placed", () => {
    const myBoard = Gameboard()
    myBoard.createBoard()
    const carrier = Ship("Carrier",5)
    let j = 63
    myBoard.placeShip(carrier,j,"x")
    for (let i = 1; i <= carrier.getLength(); i += 1) {
        expect(myBoard.getSquare(j)).toBe("Carrier")
        j += 1
    }
})