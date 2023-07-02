import Ship from "./ship"
import Gameboard from "./gameboard"

// Factory representing a player in the game
const Player = (type) => {

    const _gameBoard = Gameboard() // Each player has a game board
    const _type = type // Possible values: "Human" or "AI"
    const _ships = [Ship("carrier"),Ship("battleship"),Ship("destroyer"),Ship("submarine"),Ship("boat")] // Array of ships a player is provided with
    const _availableAttacks = Array.from({length: 100}, (_, index) => index) // Creates an array from 0 to 99
    let _attackMode = "hunt" // "hunt" or "target"
    const _attacksStack = [] // Stack of attacks to be performed in "target" mode
    let _lastAttack = null // Last attack performed by the player

    // Gets last attack performed by the player
    const getLastAttack = () => _lastAttack

    // Sets last attack performed by the player
    const setLastAttack = (square) => {
        _lastAttack = square
    }

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

    // Returns a random element from an array
    const getRandomElement = (myArray) => {

        const index = Math.floor(Math.random() * myArray.length)
        return myArray[index]

    } 

    // When we attack a position in enemy's board 
    // we need to delete it from available attacks to not repeat it in the future
    const deleteFromAvailableAttacks = (square) => {
        
        const res = { success: null, error: null}
        
        if (!isValidAttack(square)) {
            
            res.error = `Error deleting square number ${square} from available attacks` // There is no square with that number in the array

        } else {

            const index = getIndexOfAttack(square)
            _availableAttacks.splice(index,1)
            res.success = `Square number ${square} deleted from available attacks`

        }

        return res

    }

    // Gets attack mode
    const getAttackMode = () => _attackMode

    // Adds a square to the attacks stack
    const addToAttacksStack = (square) => _attacksStack.push(square)

    // Retrieve a square from the attacks stack
    const getFromAttacksStack = () => _attacksStack.pop()

    // Returns true if the attacks stack is empty
    const isAttacksStackEmpty = () => _attacksStack.length === 0

    // Updates attacks stack
    const updateAttacksStack = (square) => {

        // Try to add top neighbour square to the stack
        if (square - 10 >= 0 && isValidAttack(square - 10)) {

            addToAttacksStack(square - 10)
            deleteFromAvailableAttacks(square - 10)

        }

        // Try to add bottom neighbour square to the stack
        if (square + 10 <= 99 && isValidAttack(square + 10)) {

            addToAttacksStack(square + 10)
            deleteFromAvailableAttacks(square + 10)

        }

        // Try to add left neighbour square to the stack
        if (square % 10 !== 0 && isValidAttack(square - 1)) {

            addToAttacksStack(square - 1)
            deleteFromAvailableAttacks(square - 1)

        }

        // Try to add right neighbour square to the stack
        if (square % 10 !== 9 && isValidAttack(square + 1)) {
                
                addToAttacksStack(square + 1)
                deleteFromAvailableAttacks(square + 1)
    
        }

    }


    // Generates a square to attack
    const generateAutoAttack = () => {
        
        // Variables
        let square = null
        let res = { success: null, error: null }

        // If we are in "hunt" mode and the "boat" ship is not sunk, generate a random attack but only for odd squares
        if (getAttackMode() === "hunt" && getGameBoard().getShortestShipLengthInGame() === 2) {
            
            square = getRandomElement(getAvailableAttacks().filter((n) => n % 2 !== 0))

            // Delete the square from the available attacks array
            res = deleteFromAvailableAttacks(square)

        }
        else if (getAttackMode() === "hunt") { // The boat ship is sunk, so we need another strategy (working on it)

            square = getRandomElement(getAvailableAttacks()) // Modify this line to implement a new strategy

            // Delete the square from the available attacks array
            res = deleteFromAvailableAttacks(square)

        }
        else { // We are in "target" mode

            // Gets a square from the attacks stack
            square = getFromAttacksStack()

        }

        if (res.error) {

            console.log(res.error)

        }

        if (res.success) {

            console.log(res.success)

        }

        // Set last attack
        setLastAttack(square)
        
        // Return the square to attack
        return square

    }

    // Human player attacks an specific location
    const manualAttack = (square) => {

        // Test if is valid attack
        if (!isValidAttack(square)) {
            return { error: "Invalid attack! That square was attacked yet" }
        }

        // Delete tha square from valid attacks array
        const res = deleteFromAvailableAttacks(square)

        if (res.error) {

            console.log(res.error)

        }
        else {

            console.log(res.success)

        }

        // Return success msg
        return {success: "Position attacked! "}
    }

    // Toggle attack mode
    const setAttackModeTo = (mode) => {
        
        _attackMode = mode

    }

    // updates attack strategy and returns it
    const updateStrategy = (attackResult) => {

        let attackMode = ""

        // If the attack was a hit, I need to change the attack mode to "target"
        if (attackResult.type === "ShipHit") {
            
            attackMode = "target"

            // Attacks Stacks needs to be updated
            updateAttacksStack(getLastAttack())

        }
        else if (attackResult.type === "Miss") { // If the attack was a miss, check the stack
                
                // If the stack is not empty, I need to change the attack mode to "target"
                if (!isAttacksStackEmpty()) {
                    attackMode = "target"
                }

                // If the stack is empty, I need to change the attack mode to "hunt"
                else {
                    attackMode = "hunt"
                }

        }

        setAttackModeTo(attackMode)
        return attackMode

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
        deleteShipByName,
        updateStrategy
    }

}

export default Player