import Gameboard from "./gameboard"

// Factory representing a player in the game
const Player = (type,ships) => {

    const _gameBoard = Gameboard() // Each player has a game board
    const _type = type // Possible values: "Human" or "AI"
    const _ships = ships // Array of ships a player is provided with

    // Gets the game board
    const getGameBoard = () => _gameBoard
    
    // Gets the player type
    const getPlayerType = () => _type

    // Gets the player ships array
    const getShips = () => _ships

    // Gets ship at position in the array of player's ships
    const getShipAtPos = (pos) => _ships[pos]
    
    const placeShips = () => {

        // We need to fill the game board squares
        getGameBoard().createBoard()

        if (getPlayerType() === "AI") {
            
            // Place every ship player has
            for (let i = 0; i < getShips().length; i += 1) {
                
                // Keep in while loop until success
                let success = false

                while (!success) {
                    try {
                        // Square and orientation are random generated
                        getGameBoard().
                            placeShip(
                                getShipAtPos(i),
                                Math.floor(Math.random() * 100),
                                Math.random() < 0.5 ? "x" : "y")
                        success = true
                    } catch (error) {
                        console.error(`Error: ${error.message}`)
                    }
                }                
            }

        }
    }

    return {
        placeShips
    }

}

export default Player