import Ship from "../src/ship"

/* global test, expect */

test("Gets the same name passed when factory was created", () => {
    expect(Ship("Carrier",5).getName()).toBe("Carrier")
})

test("Gets the same length passed when factory was created", () => {
    expect(Ship("Carrier",5).getLength()).toBe(5)
})