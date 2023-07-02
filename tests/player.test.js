import Player from "../src/player"

/* global test, expect, beforeEach */

let player1
let player2
let player3

beforeEach(() => {
    player1 = Player("AI")
    player2 = Player("AI")
    player3 = Player("Human")
    player1.placeShipsRandomly()
    player2.placeShipsRandomly()
})

test("Create 2 boards generated by AI players", () => {
    // Player 1 gameboard has 5 ships
    expect(player1.getGameBoard().getShips().length).toBe(5)
    // Player 2 gameboard has 5 ships
    expect(player2.getGameBoard().getShips().length).toBe(5)
})

test("AI player generates a first attack and it's valid (from 0 to 99)", () => {
    // Attack generation
    expect(player1.generateAutoAttack()).toBeGreaterThanOrEqual(0)
    expect(player1.generateAutoAttack()).toBeLessThanOrEqual(99)
})

test("Human player first attack success and square is deleted from valid attacks array", () => {
    const result = player1.manualAttack(50)
    expect(result.success).toBe("Position attacked! ")
    expect(player1.isValidAttack(50)).toBeFalsy()
})

test("Human player can't attack same square twice", () => {
    let result = player1.manualAttack(40)
    expect(result.success).toBe("Position attacked! ")
    result = player1.manualAttack(40)
    expect(result.error).toBe("Invalid attack! That square was attacked yet")
})

test("When a player attacks a square, that square is deleted from available attacks array", () => {
    const square = player1.generateAutoAttack()
    expect(player1.isValidAttack(square)).toBeFalsy()
})

test("Player type is set correctly", () => {
    expect(player1.getPlayerType()).toBe("AI")
    expect(player3.getPlayerType()).toBe("Human")
})
  
test("Manual attack on an invalid square returns an error", () => {
    const result = player1.manualAttack(150)
    expect(result.error).toBe("Invalid attack! That square was attacked yet")
})
  
test("Random direction is x or y", () => {
    const directions = new Set();
    for (let i = 0; i < 100; i += 1) {
        directions.add(player1.getRandomDirection())
    }
    expect(directions.size).toBeLessThanOrEqual(2)
    expect(directions.has("x")).toBeTruthy()
    expect(directions.has("y")).toBeTruthy()
})

test("Find a ship by name and exist", () => {
    const ship = player1.getShipByName("Carrier")
    expect(ship).toBeDefined()
})

test("Delete a ship by name. Find this ship by name and not exist", () => {
    player1.deleteShipByName("Carrier")
    const ship = player1.getShipByName("Carrier")
    expect(ship).toBeNull()
})

// Attack mode tests
test("Attack mode is set correctly when a ship is hit", () => {
    const mode = player1.updateStrategy({type: "ShipHit"})
    expect(mode).toBe("target")
})