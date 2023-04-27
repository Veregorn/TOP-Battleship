// Factory representing a Ship in the game
const Ship = (name,length) => {
    
    const _name = name // Carrier 5 - Battleship 4 - Destroyer 3 - Submarine 3 - Patrol Boat 2
    const _length = length // Number of squares the ship occupies (see above)
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