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

test("A ship placed into the limits of the board is correctly placed (horizontally)", () => {
    const myBoard = Gameboard()
    myBoard.createBoard()
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
    const myBoard = Gameboard()
    myBoard.createBoard()
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
    const myBoard = Gameboard()
    myBoard.createBoard()
    const destroyer = Ship("Destroyer",3)
    const j = 80
    expect(() => myBoard.placeShip(destroyer,j,"y"))
        .toThrow(/^You are exceeding the limits of the board$/)
})

test("Placing a ship out of the limits (x axis)", () => {
    const myBoard = Gameboard()
    myBoard.createBoard()
    const destroyer = Ship("Destroyer",3)
    const j = 18
    expect(() => myBoard.placeShip(destroyer,j,"x"))
        .toThrow(/^You are exceeding the limits of the board$/)
})