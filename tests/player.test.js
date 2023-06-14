import Player from "../src/player";
import Ship from "../src/ship";

/* global test, expect, beforeEach */

const myShips = [Ship("Carrier"),Ship("Battleship"),Ship("Destroyer"),Ship("Submarine"),Ship("Patrol Boat")]
let player1
let player2
let player3

// const player3 = Player("Human",myShips)

beforeEach(() => {
    player1 = Player("AI",myShips)
    player2 = Player("AI",myShips)
    player3 = Player("Human",myShips)
    player1.placeShips()
    player2.placeShips()
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
    expect(result.success).toBe("Position attacked!")
    expect(player1.isValidAttack(50)).toBeFalsy()
})

test("Human player can't attack same square twice", () => {
    let result = player1.manualAttack(40)
    expect(result.success).toBe("Position attacked!")
    result = player1.manualAttack(40)
    expect(result.error).toBe("Invalid attack!")
})

test("When a player attacks a square, that square is deleted from available attacks array", () => {
    const square = player1.generateAutoAttack()
    expect(player1.isValidAttack(square)).toBeFalsy()
})

test("Player type is set correctly", () => {
    expect(player1.getPlayerType()).toBe("AI")
    expect(player3.getPlayerType()).toBe("Human")
})
  
test("Ships are set correctly", () => {
    expect(player1.getShips()).toEqual(myShips)
    expect(player3.getShips()).toEqual(myShips)
})
  
test("Manual attack on an invalid square returns an error", () => {
    const result = player1.manualAttack(150)
    expect(result.error).toBe("Invalid attack!")
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