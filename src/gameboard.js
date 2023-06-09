// Factory representing a game board in the game
const Gameboard = () => {

    const _board = Array(100).fill("Water") // Array of 100 squares representing the game board
    const _ships = [] // Array of ships on the board
    let _gameover = false // Boolean to check if the game is over

    // Get the board array
    const getBoard = () => _board
    
    // Get the ships array
    const getShips = () => _ships

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
    const setShip = (ship) => getShips().push(ship)

    // Return true if two squares are in the same line in the board
    const isSameLine = (x,y) => Math.floor(x / 10) === Math.floor(y / 10)

    // Return true if next square is in the same line or column that previous one
    const isValidNextSquare = (current,next,direction) => 
        direction === "x" ? isSameLine(next, current) : next <= 99

    // Return true if a square is empty (no other ship is placed there)
    const isEmptySquare = (square) => 
        getSquare(square) === "Water"

    // Gets next position in the board depending on ship direction placement
    const getNextPosition = (currentPos,direction) => 
        direction === "x" ? currentPos + 1 : currentPos + 10

    // Places a ship
    const placeShip = (ship,startPos,direction) => {
        
        let nextPos = startPos
        const validPosArray = []

        for (let i = 1; i <= ship.getLength(); i += 1) {
            
            // Test if the next position is valid
            if (!isValidNextSquare(startPos,nextPos,direction)) {
                return { error: "You are exceeding the limits of the board" }
            }

            // Test if that square is empty (no other ship placed there)
            if (!isEmptySquare(nextPos)) {
                return { error: "That square is not empty" }
            }
            
            // Insert the valid position into our temp array
            validPosArray.push(nextPos)
            
            // Update position
            nextPos = getNextPosition(nextPos,direction)

        }

        // Set square string to ship name for each value in the temp array
        for (let i = 0; i < validPosArray.length; i += 1) {
            setSquare(validPosArray[i],ship.getName())
        }

        // Place the ship in the array of ships
        setShip(ship)

        // Return a success message and the array of valid positions
        return {
            data: validPosArray,
            success: `A ${ship.getName()} has been placed`
        }

    }

    // Find and return a Ship in the board
    const findShip = (shipName) => {
        
        const ship = getShips().find(s => s.getName() === shipName)
        
        // If no ship found, returns an error
        if (!ship) {
            return { error: "No ship found with that name" }
        }

        return ship

    }

    // Checks if the game is over
    const checkGameOver = () => {
        if (getShips().length === 0) {
            setGameOver();
        }
    }

    // Delete a ship from the ships array
    const deleteShip = (shipName) => {
        
        const index = getShips().findIndex(s => s.getName() === shipName)

        // If no ship found, returns an error
        if (index === -1) {
            return { error: "There is no ship with that name to delete" }
        }
        
        getShips().splice(index,1)
                
        // Check if the game is over
        checkGameOver()

        // Return a success message
        return { success: `Ship named "${shipName}" has been deleted` }

    }

    // takes a square number, determines whether or not the attack hit a ship and then 
    // sends the ‘hit’ function to the correct ship, or records the coordinates 
    // of the missed shot
    const receiveAttack = (squareNumber) => {
        
        const square = getSquare(squareNumber)
        const result = {type: "", success: "", error: "", sunk: "", gameover: false}

        // Attack fails
        if (square === "Water") {
            result.type = "Miss"
            setSquare(squareNumber,result.type)
            result.success = "Hahaha! Better luck next time!"
        } else if (square === "Miss" || square === "ShipHit") { // Invalid attack received
            result.error = `This square was already attacked! ${squareNumber}` // Crisis
        } else { // Attack hits
            const damagedShip = findShip(square)
            if (damagedShip.error) {
                result.error = damagedShip.error
                return result
            }
            result.type = "ShipHit"
            setSquare(squareNumber,result.type)
            damagedShip.hit()
            result.success = "Arggh! You hit my ship!"

            // Need to test if ship is sunk
            if (damagedShip.isSunk()) {
                
                result.sunk = damagedShip.getName()
                deleteShip(damagedShip.getName())
                checkGameOver()

                // If game is over, return that in the result
                if (getGameOver()) {
                    result.gameover = true
                }

            }

        }

        return result

    }

    // Returns the length of the shortest ship in the board
    const getShortestShipLengthInGame = () => {

        let shortestShipLength = getShips()[0].getLength() // Set the shortest ship length to the first ship length

        // Loop through the ships array
        for (let i = 1; i < getShips().length; i += 1) {

            // If the current ship length is shorter than the shortest ship length, update the shortest ship length
            if (getShips()[i].getLength() < shortestShipLength) {
                shortestShipLength = getShips()[i].getLength()
            }

        }

        return shortestShipLength

    }

    return {
        getGameOver,
        getSquare,
        placeShip,
        findShip,
        receiveAttack,
        getShips,
        getBoard,
        getShortestShipLengthInGame
    }

}

export default Gameboard