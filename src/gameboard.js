// Factory representing a game board in the game
const Gameboard = () => {

    const _board = [] // Array of 100 squares representing the game board
    const _ships = [] // Array of ships on the board
    let _gameover = false

    // Get if the game is over
    const getGameOver = () => _gameover

    // Set Game Over
    const setGameOver = () => {
        _gameover = true
    }

    // Get a Square
    const getSquare = (square) => _board[square]

    // Set a Square
    const setSquare = (num,value) => {
        _board[num] = value
    }

    // Set a ship in the array of ships
    const setShip = (ship) => _ships.push(ship)
    
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
            
            if (direction === "x") {
                // Number has changed decade
                if (Math.floor(nextPos / 10) !== Math.floor(startPos / 10)) {
                    throw new Error("You are exceeding the limits of the board")
                }
            }
            
            if (direction === "y") {
                if (nextPos > 99) {
                    throw new Error("You are exceeding the limits of the board")
                }
            }
            
            // Set square string to ship name
            setSquare(nextPos,ship.getName())
            
            if (direction === "x") {
                nextPos += 1
            }
            
            if (direction === "y") {
                nextPos += 10
            }

            i += 1

        }

        // Place the ship in the array of ships
        setShip(ship)
    }

    // Find and return a Ship in the board
    const findShip = (shipName) => {
        for (let i = 0; i < _ships.length; i += 1) {
            if (_ships[i].getName() === shipName) {
                return _ships[i]
            }
        }
        // If no ship found, throw an error
        throw new Error("No ship found with that name")
    }

    // Delete a ship from the ships array
    const deleteShip = (shipName) => {
        for (let i = 0; i < _ships.length; i += 1) {
            if (_ships[i].getName() === shipName) {
                _ships.splice(i,1)
                if (_ships.length === 0) {
                    setGameOver()
                }
                return
            }
        }
        // If no ship found, throw an error
        throw new Error("There is no ship with that name to delete")
    }

    // takes a pair of coordinates, determines whether or not the attack hit a ship and then 
    // sends the ‘hit’ function to the correct ship, or records the coordinates 
    // of the missed shot
    const receiveAttack = (x,y) => {
        
        const squareNumber = (x * 10) + y

        // Attack fails
        if (getSquare(squareNumber) === "Water") {
            setSquare(squareNumber,"Hit")
        } else { // Attack hits
            const hitShip = findShip(getSquare(squareNumber))
            setSquare(squareNumber,`${hitShip.getName()}-Hit`)
            hitShip.hit()

            // Need to test if ship is sunk
            if (hitShip.isSunk()) {
                deleteShip(hitShip.getName())
            }
        }

    }

    // Prints board into the console
    const printBoard = () => {
        for (let i = 0; i < _board.length; i += 10) {
            console.log(
                getSquare(i).padEnd(15," "),
                getSquare(i+1).padEnd(15," "),
                getSquare(i+2).padEnd(15," "),
                getSquare(i+3).padEnd(15," "),
                getSquare(i+4).padEnd(15," "),
                getSquare(i+5).padEnd(15," "),
                getSquare(i+6).padEnd(15," "),
                getSquare(i+7).padEnd(15," "),
                getSquare(i+8).padEnd(15," "),
                getSquare(i+9).padEnd(15," "),"\n")
        }
    }

    return {
        getGameOver,
        getSquare,
        createBoard,
        placeShip,
        findShip,
        receiveAttack,
        printBoard
    }

}

export default Gameboard