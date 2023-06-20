// Factory representing a Ship in the game
const Ship = (name) => {
    
    const _name = name
    
    let _length = 0 // Number of squares the ship occupies

    // Carrier 5 - Battleship 4 - Destroyer 3 - Submarine 3 - Patrol Boat 2
    switch (true) {
        
        case _name === "carrier":
            _length = 5
            break
        case _name === "battleship":
            _length = 4
            break
        case _name === "destroyer":
            _length = 3
            break
        case _name === "submarine":
            _length = 3
            break
        case _name === "boat":
            _length = 2
            break
        default:
            _length = 0
            break

    }

    let _hits = 0 // Number of times the ship has been damaged
    let _sunk = false // Indicates if the ship has been sunk or not

    const getName = () => _name

    const getLength = () => _length

    const getHits = () => _hits

    const hit = () => {
        
        if (_hits < _length) {
            _hits += 1;
        }

        if (_hits === _length) {
            _sunk = true
        }
    }

    const isSunk = () => _sunk

    return {
        getName,
        getLength,
        getHits,
        hit,
        isSunk
    }
}

export default Ship