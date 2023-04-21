import Ship from "../src/ship"

/* global test, expect */

test("Gets the same name passed when factory was created", () => {
    expect(Ship("Carrier",5).getName()).toBe("Carrier")
})

test("Gets the same length passed when factory was created", () => {
    expect(Ship("Carrier",5).getLength()).toBe(5)
})

test("Hits a ship and gets the number of hits a ship has received", () => {
    const myShip = Ship("Battleship",4)
    myShip.hit() // 1
    myShip.hit() // 2
    myShip.hit() // 3
    expect(myShip.getHits()).toBe(3)
})

test("A ship that has been hit less times that his length isn't sunk", () => {
    const myShip = Ship("Battleship",4)
    myShip.hit() // 1
    myShip.hit() // 2
    myShip.hit() // 3
    expect(myShip.isSunk()).toBe(false)
})

test("A ship that has been hit his length times is sunk", () => {
    const myShip = Ship("Battleship",4)
    myShip.hit() // 1
    myShip.hit() // 2
    myShip.hit() // 3
    myShip.hit() // 4
    expect(myShip.isSunk()).toBe(true)
})