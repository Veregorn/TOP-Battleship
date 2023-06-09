import Ship from "../src/ship"

/* global test, expect */

test("Gets the same name passed when factory was created", () => {
    expect(Ship("carrier").getName()).toBe("carrier")
})

test("Gets the right length", () => {
    expect(Ship("carrier").getLength()).toBe(5)
})

test("A newly created ship has 0 hits", () => {
    expect(Ship("carrier").getHits()).toBe(0);
});

test("A newly created ship is not sunk", () => {
    expect(Ship("carrier").isSunk()).toBe(false);
});

test("Hitting a ship more times than its length doesn't cause issues", () => {
    const myShip = Ship("battleship");
    myShip.hit(); // 1
    myShip.hit(); // 2
    myShip.hit(); // 3
    myShip.hit(); // 4
    myShip.hit(); // 5 (exceeds length)
    expect(myShip.getHits()).toBe(4);
    expect(myShip.isSunk()).toBe(true);
});

test("Hits a ship and gets the number of hits a ship has received", () => {
    const myShip = Ship("battleship")
    myShip.hit() // 1
    myShip.hit() // 2
    myShip.hit() // 3
    expect(myShip.getHits()).toBe(3)
})

test("A ship that has been hit less times that his length isn't sunk", () => {
    const myShip = Ship("battleship")
    myShip.hit() // 1
    myShip.hit() // 2
    myShip.hit() // 3
    expect(myShip.isSunk()).toBe(false)
})

test("A ship that has been hit his length times is sunk", () => {
    const myShip = Ship("battleship")
    myShip.hit() // 1
    myShip.hit() // 2
    myShip.hit() // 3
    myShip.hit() // 4
    expect(myShip.isSunk()).toBe(true)
})