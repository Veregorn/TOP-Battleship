// Factory representing a game board in the game
const Gameboard = () => {

    const _board = [] // Array of 100 squares representing the game board
    let _ships = [] // Array of ships on the board
    let _hits = 0 // Number of hits on the board

    // Get a Square
    const getSquare = (square) => _board[square]

    // Set a Square
    const setSquare = (num,value) => {
        _board[num] = value
    }
    
    // Creates the board
    const createBoard = () => {
        for (let i = 0; i < 100; i += 1) {
            _board[i] = "Water";
            setSquare(i,"Water")
        }
    }

    // Places a ship
    const placeShip = (ship,startPos,direction) => {
        let i = 1
        let nextPos = startPos
        while (i <= ship.getLength()) {
            setSquare(nextPos,ship.getName())
            if (direction === "x") {
                nextPos += 1
            }
            if (direction === "y") {
                nextPos += 10
            }
            i += 1
        }
    }

    return {
        getSquare,
        setSquare,
        createBoard,
        placeShip
    }

}

export default Gameboard