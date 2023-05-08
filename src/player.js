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
    
    const placeShips = () => {

        if (getPlayerType() === "AI") {
            
            // Creates an ordered array 0 to 99
            const startPositionCandidates = Array.from({ length: 100 }, (_, index) => index);
            // Shuffle array positions            
            const shuffledPositions = shuffleArray(startPositionCandidates);

            // For each ship this player has
            for (let i = 0; i < getShips().length; i += 1) {
                
                // Iterate "shuffledPositions" array until find a valid ship placement
                for (let j = 0; j < shuffledPositions.length; j += 1) {
                    const direction = getRandomDirection();
                    const result = getGameBoard().placeShip(getShipAtPos(i), shuffledPositions[j], direction);

                    if (result.success) {
                        console.log(`Result: ${result.success}`);
                        break;
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
            return { error: "Invalid attack!" }
        }

        // Delete tha square from valid attacks array
        deleteFromAvailableAttacks(getIndexOfAttack(square))

        // Return success msg
        return {success: "Position attacked!"}
    }

    return {
        getGameBoard,
        placeShips,
        generateAutoAttack,
        isValidAttack,
        manualAttack,
        getPlayerType,
        getShips,
        getRandomDirection
    }

}

export default Player