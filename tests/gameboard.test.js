import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

/* global test, expect, beforeEach */

let myBoard;

beforeEach(() => {
  myBoard = Gameboard()
});

test("At start, board is empty of ships", () => {
    const arr = myBoard.getBoard()
    expect(arr.every(square => square === "Water")).toBeTruthy()
})

test("There are 100 squares in the board", () => {
    const arr = myBoard.getBoard()
    expect(arr.length).toBe(100)
})

test("At start, Ships array is empty", () => {
    const shipsArr = myBoard.getShips()
    expect(shipsArr.length).toBe(0)
})

test("A ship placed into the limits of the board is correctly placed (horizontally)", () => {
    const carrier = Ship("Carrier")
    let j = 25
    myBoard.placeShip(carrier,j,"x")
    for (let i = 1; i <= carrier.getLength(); i += 1) {
        expect(myBoard.getSquare(j)).toBe("Carrier")
        j += 1
    }
    expect(myBoard.getSquare(68)).toBe("Water") // Next to (after)
    expect(myBoard.getSquare(62)).toBe("Water") // Next to (before)
    const shipsArr = myBoard.getShips()
    expect(shipsArr.length).toBe(1) // Length of ships array has changed
})

test("A ship placed into the limits of the board is correctly placed (vertically)", () => {
    const destroyer = Ship("Destroyer")
    let j = 70
    const result = myBoard.placeShip(destroyer,j,"y")
    expect(result.success).toBe("A Destroyer has been placed")
    for (let i = 1; i <= destroyer.getLength(); i += 1) {
        expect(myBoard.getSquare(j)).toBe("Destroyer")
        j += 10
    }
    expect(myBoard.getSquare(10)).toBe("Water") // Next to (after)
    expect(myBoard.getSquare(50)).toBe("Water") // Next to (before)
})

test("Placing a ship out of the limits (y axis)", () => {
    const result = myBoard.placeShip(Ship("Destroyer",3),80,"y")
    expect(result.error).toBe("You are exceeding the limits of the board")
})

test("Placing a ship out of the limits (x axis)", () => {
    const result = myBoard.placeShip(Ship("Destroyer",3),18,"x")
    expect(result.error).toBe("You are exceeding the limits of the board")
})

test("Checking ships array length after invalid placement", () => {
    myBoard.placeShip(Ship("Destroyer"),18,"x")
    const ships = myBoard.getShips()
    expect(ships.length).toBe(0)
})

test("Attack hits a ship and records the hit correctly", () => {
    const battleship = Ship("Battleship")
    myBoard.placeShip(battleship,74,"x")
    myBoard.receiveAttack(77)
    expect(battleship.getHits()).toBe(1)
    expect(myBoard.getSquare(77)).toBe("ShipHit")
})

test("Attack fails and records the miss correctly", () => {
    myBoard.receiveAttack(77)
    expect(myBoard.getSquare(77)).toBe("Miss")
})

test("All the ships have been sunk", () => {
    const battleship = Ship("Battleship")
    myBoard.placeShip(battleship,74,"x")
    myBoard.receiveAttack(74)
    myBoard.receiveAttack(75)
    myBoard.receiveAttack(76)
    myBoard.receiveAttack(77)
    expect(myBoard.getGameOver()).toBeTruthy()
    const ships = myBoard.getShips()
    expect(ships.length).toBe(0)
})

// Multiple ships placement and interactions

test("Two non-overlapping ships are placed correctly next to each other (horizontally)", () => {
    const carrier = Ship("Carrier")
    const submarine = Ship("Submarine")
    myBoard.placeShip(carrier,10,"x")
    myBoard.placeShip(submarine,15,"x")

    for (let i = 10; i < 15; i += 1) {
        expect(myBoard.getSquare(i)).toBe("Carrier")
    }

    for (let i = 15; i < 18; i += 1) {
        expect(myBoard.getSquare(i)).toBe("Submarine")
    }
})

test("Attack hits one ship and misses another", () => {
    const carrier = Ship("Carrier")
    const submarine = Ship("Submarine")
    myBoard.placeShip(carrier,10,"x")
    myBoard.placeShip(submarine,15,"x")
    myBoard.receiveAttack(14)

    // Control that hits the Carrier
    expect(carrier.getHits()).toBe(1)

    // Miss the Submarine
    expect(submarine.getHits()).toBe(0)

    // Attacked square is a hit
    expect(myBoard.getSquare(14)).toBe("ShipHit");
})

test("One ship is sunk while another remains on the board", () => {
    const carrier = Ship("Carrier")
    const submarine = Ship("Submarine")
    myBoard.placeShip(carrier,10,"x")
    myBoard.placeShip(submarine,15,"x")

    for (let i = 10; i < 15; i += 1) {
        myBoard.receiveAttack(i)
    }

    // Carrier is sunk
    expect(carrier.isSunk()).toBeTruthy()

    // Submarine isn't sunk
    expect(submarine.isSunk()).toBeFalsy()

    // Game continues
    expect(myBoard.getGameOver()).toBeFalsy()

    // There is only one ship on the board
    expect(myBoard.getShips().length).toBe(1)

    // That ship is a submarine
    expect(myBoard.getShips()[0].getName()).toBe("Submarine")
})

test("Two ships can't be placed on the same square", () => {
    const carrier = Ship("Carrier")
    const submarine = Ship("Submarine")
    myBoard.placeShip(carrier,10,"x")
    const result = myBoard.placeShip(submarine,14,"x")
    
    // Submarine placement results in an error
    expect(result.error).toBe("That square is not empty")

    // Submarine has not overlapped Carrier position
    expect(myBoard.getSquare(14)).toBe("Carrier")

    // Submarine has not been placed
    expect(myBoard.getShips().length).toBe(1)
})

test("Two ships can't be placed on the same square (overlap happens in the last square of the second ship)", () => {
    const carrier = Ship("Carrier")
    const submarine = Ship("Submarine")
    myBoard.placeShip(carrier,50,"x")
    const result = myBoard.placeShip(submarine,33,"y")

    // Submarine placement results in an error
    expect(result.error).toBe("That square is not empty")

    // Submarine has not been placed
    expect(myBoard.getShips().length).toBe(1)

    // First squares where we tried to place submarine are now "Water" ones
    expect(myBoard.getSquare(33)).toBe("Water")
    expect(myBoard.getSquare(43)).toBe("Water")

    // Last square where we tried to place submarine is a "Carrier" one
    expect(myBoard.getSquare(53)).toBe("Carrier")
})

// Other cases
test("A ships is hit several times but isn't sunk", () => {
    const battleship = Ship("Battleship")
    myBoard.placeShip(battleship,74,"x")
    myBoard.receiveAttack(74)
    myBoard.receiveAttack(75)
    myBoard.receiveAttack(76)
    
    // Ship isn't sunk
    expect(battleship.isSunk()).toBeFalsy()

    // Game is still in course
    expect(myBoard.getGameOver()).toBeFalsy()
    
    // There is one ship in the game
    const ships = myBoard.getShips()
    expect(ships.length).toBe(1)
})

// Edge cases
test("A ship can be placed in a corner", () => {
    const battleship = Ship("Battleship")
    myBoard.placeShip(battleship,96,"x")

    // Ship has been placed correctly
    for (let i = 96; i < 100; i += 1) {
        expect(myBoard.getSquare(i)).toBe("Battleship")
    }

    // There is one ship in the board
    expect(myBoard.getShips().length).toBe(1)

    // The ship is a Battleship
    expect(myBoard.getShips()[0].getName()).toBe("Battleship")
})