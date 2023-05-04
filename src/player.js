import Gameboard from "./gameboard"

// Factory representing a player in the game
const Player = (type,ships) => {

    const _gameBoard = Gameboard() // Each player has a game board
    const _type = type // Possible values: "Human" or "AI"
    const _ships = ships // Array of ships a player is provided with
    const _availableAttacks = Array.from({length: 100}, (_, index) => index) // Creates an array from 0 to 99

    // Gets the game board
    const getGameBoard = () => _gameBoard
    
    // Gets the player type
    const getPlayerType = () => _type

    // Gets the player ships array
    const getShips = () => _ships

    // Gets ship at position in the array of player's ships
    const getShipAtPos = (pos) => _ships[pos]

    // Gets the attacks array
    const getAvailableAttacks = () => _availableAttacks

    // Gets the square at 'pos' in the '_availableAttacks' array
    const getAttackAtPos = (pos) => _availableAttacks[pos]

    // Receives a square in returns true if that square hasn't been attacked yet
    const isValidAttack = (square) => getAvailableAttacks().includes(square)
    
    const placeShips = () => {

        if (getPlayerType() === "AI") {
            
            // Place every ship player has
            for (let i = 0; i < getShips().length; i += 1) {
                
                // Keep in while loop until success
                let success = false

                while (!success) {
                    // Square and orientation are random generated
                    const result = getGameBoard().
                        placeShip(
                            getShipAtPos(i),
                            Math.floor(Math.random() * 100),
                            Math.random() < 0.5 ? "x" : "y")
                    
                    // Test if ship was placed successfully
                    if (result.success) {
                        success = true
                        console.log(`Result: ${result.success}`)
                    } else {
                        console.error(`Error: ${result.error}`)
                    }
                }                
            }

        }
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
    const generateAttack = () => {
            
            const index = generateRandomIndex()
            const square = getAttackAtPos(index)
            deleteFromAvailableAttacks(index)
            return square

    }

    return {
        getGameBoard,
        placeShips,
        generateAttack,
        isValidAttack
    }

}

export default Player