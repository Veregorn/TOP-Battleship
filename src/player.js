import Ship from "./ship"
import Gameboard from "./gameboard"

// Factory representing a player in the game
const Player = (type) => {

    const _gameBoard = Gameboard() // Each player has a game board
    const _type = type // Possible values: "Human" or "AI"
    const _ships = [Ship("carrier"),Ship("battleship"),Ship("destroyer"),Ship("submarine"),Ship("boat")] // Array of ships a player is provided with
    const _availableAttacks = Array.from({length: 100}, (_, index) => index) // Creates an array from 0 to 99

    // Gets the game board
    const getGameBoard = () => _gameBoard
    
    // Gets the player type
    const getPlayerType = () => _type

    // Gets the player ships array
    const getShips = () => _ships

    // Gets ship at position in the array of player's ships
    const getShipAtPos = (pos) => _ships[pos]

    // Receives a name and returns the ship with that name or null if it doesn't exist
    const getShipByName = (name) => {
        
        for (let i = 0; i < _ships.length; i += 1) {
            if (_ships[i].getName() === name) {
                return _ships[i]
            }
        }
        return null
        
    }

    // Receives a ship name and deletes it from the player's ships array
    const deleteShipByName = (name) => {
        
        for (let i = 0; i < _ships.length; i += 1) {
            if (_ships[i].getName() === name) {
                _ships.splice(i, 1)
                break
            }
        }

    }

    // Gets the attacks array
    const getAvailableAttacks = () => _availableAttacks

    // Gets the square at 'pos' in the '_availableAttacks' array
    const getAttackAtPos = (pos) => _availableAttacks[pos]

    // Gets index of a square in the '_availableAttacks' array
    const getIndexOfAttack = (square) => _availableAttacks.indexOf(square)

    // Receives a square in returns true if that square hasn't been attacked yet
    const isValidAttack = (square) => getAvailableAttacks().includes(square)

    // Gets a random value "x" or "y" for the orientation of a ship
    const getRandomDirection = () => (Math.random() < 0.5 ? "x" : "y")

    // Randomly shuffles an array 
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
        }
        return shuffledArray
    }
    
    // Places ships randomly on the game board
    const placeShipsRandomly = () => {
            
        // Creates an ordered array 0 to 99
        const startPositionCandidates = Array.from({ length: 100 }, (_, index) => index);
        // Shuffle array positions            
        const shuffledPositions = shuffleArray(startPositionCandidates);

        // While the array of ships is not empty
        while (getShips().length > 0) {
            
            // Iterate "shuffledPositions" array until find a valid ship placement
            for (let j = 0; j < shuffledPositions.length; j += 1) {
                const direction = getRandomDirection()
                const result = getGameBoard().placeShip(getShipAtPos(getShips().length - 1), shuffledPositions[j], direction)

                if (result.success) {
                    getShips().pop()
                    break
                }
            }
        }
        
    }

    // Places a ship manually on the gameboard
    const placeShip = (square, shipName, orientation) => {
        
        // Get the ship
        const ship = getShipByName(shipName)

        // Test if ship exists
        if (!ship) {
            return { error: "Ship doesn't exist!" }
        }

        // We need to translate "orientation" into "direction"
        const direction = orientation === "horizontal" ? "x" : "y"

        const res = getGameBoard().placeShip(ship, square, direction)

        // If ship placement was successful, 
        // delete it from the player's ships array,
        // return success msg and the array of squares this ship occupies
        if (res.success) {
            
            deleteShipByName(shipName)
            return { success: "Ship placed", squares: res.data }

        }
        
        return { error: "Invalid ship placement" }

    }

    // Generates a random index from that array of available attacks
    const generateRandomIndex = () => 
        Math.floor(Math.random() * getAvailableAttacks().length)

    // When we attack a position in enemy's board 
    // we need to delete it from available attacks to not repeat it in the future
    const deleteFromAvailableAttacks = (index) => {
        _availableAttacks.splice(index,1)
    }

    // Generates a square to attack
    const generateAutoAttack = () => {
            
            const index = generateRandomIndex()
            const square = getAttackAtPos(index)
            deleteFromAvailableAttacks(index)
            return square

    }

    // Human player attacks an specific location
    const manualAttack = (square) => {

        // Test if is valid attack
        if (!isValidAttack(square)) {
            return { error: "Invalid attack! That square was attacked yet" }
        }

        // Delete tha square from valid attacks array
        deleteFromAvailableAttacks(getIndexOfAttack(square))

        // Return success msg
        return {success: "Position attacked! "}
    }

    return {
        getGameBoard,
        placeShipsRandomly,
        generateAutoAttack,
        isValidAttack,
        manualAttack,
        getPlayerType,
        getShips,
        getRandomDirection,
        placeShip,
        getShipByName,
        deleteShipByName
    }

}

export default Player